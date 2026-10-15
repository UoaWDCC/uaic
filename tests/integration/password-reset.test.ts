// Integration test - see tests/README.md for the DATABASE_URI import-order
// gotcha this beforeAll works around, and why mongodb-memory-server is used.
import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
import type { auth as Auth, client as Client } from "@/lib/auth";

// Capture reset emails instead of sending them through Resend.
const sendEmail = vi.hoisted(() => vi.fn());
vi.mock("@/features/email/lib/send-email", () => ({ sendEmail }));

describe("password reset", () => {
  const ORIGIN = "http://localhost:3000";
  const OLD_PASSWORD = "OldPassword123!";
  const NEW_PASSWORD = "NewPassword456!";

  let mongod: MongoMemoryServer;
  let auth: typeof Auth;
  let client: typeof Client;
  let counter = 0;

  // Records everything written to the console, to prove secrets never are.
  const logged: string[] = [];

  // Goes through the real HTTP handler, as the browser would.
  const post = (path: string, body: unknown) =>
    auth.handler(
      new Request(`${ORIGIN}/api/auth${path}`, {
        method: "POST",
        headers: { "content-type": "application/json", origin: ORIGIN },
        body: JSON.stringify(body),
      }),
    );

  const signUpMember = async () => {
    counter += 1;
    const email = `reset-${counter}@aucklanduni.ac.nz`;
    await auth.api.signUpEmail({ body: { email, password: OLD_PASSWORD, name: "Reset Member" } });
    return email;
  };

  // Requests a reset the way auth-client's requestPasswordReset does and
  // returns the emailed link and the token inside it.
  const requestReset = async (email: string) => {
    sendEmail.mockClear();
    const response = await post("/request-password-reset", {
      email,
      redirectTo: "/reset-password",
    });
    expect(response.status).toBe(200);
    expect(sendEmail).toHaveBeenCalledTimes(1);

    const { message } = sendEmail.mock.calls[0][0] as { message: string };
    const url = message.match(/https?:\/\/\S+/)?.[0];
    if (!url) throw new Error("Reset email contained no link");

    const token = new URL(url).pathname.split("/").pop()!;
    return { url, token };
  };

  const resetPassword = (token: string, newPassword = NEW_PASSWORD) =>
    post("/reset-password", { token, newPassword });

  const signIn = (email: string, password: string) => post("/sign-in/email", { email, password });

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    process.env.DATABASE_URI = mongod.getUri();
    process.env.BETTER_AUTH_SECRET ||= "integration-test-secret";
    process.env.BETTER_AUTH_URL ||= ORIGIN;

    for (const method of ["log", "info", "warn", "error", "debug"] as const) {
      vi.spyOn(console, method).mockImplementation((...args: unknown[]) => {
        logged.push(args.map((arg) => (arg instanceof Error ? arg.stack : String(arg))).join(" "));
      });
    }

    // dynamic import - runs *after* the env vars above are set, unlike a
    // static top-level import, which would be hoisted and run too early.
    ({ auth, client } = await import("@/lib/auth"));
  }, 60_000);

  beforeEach(() => {
    sendEmail.mockReset();
  });

  afterAll(async () => {
    vi.restoreAllMocks();
    await client.close();
    await mongod.stop();
  });

  it("emails the member a link that redirects to the reset page with the token", async () => {
    const email = await signUpMember();
    const { url, token } = await requestReset(email);

    expect(sendEmail.mock.calls[0][0]).toMatchObject({ recipient: email });
    expect(url.startsWith(`${ORIGIN}/api/auth/reset-password/`)).toBe(true);

    const response = await auth.handler(new Request(url));
    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toBe(`${ORIGIN}/reset-password?token=${token}`);
  });

  it("does not email unknown addresses and gives the same response", async () => {
    const response = await post("/request-password-reset", {
      email: "nobody@aucklanduni.ac.nz",
      redirectTo: "/reset-password",
    });

    expect(response.status).toBe(200);
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("replaces the password, so only the new one signs in", async () => {
    const email = await signUpMember();
    const { token } = await requestReset(email);

    expect((await resetPassword(token)).status).toBe(200);
    expect((await signIn(email, NEW_PASSWORD)).status).toBe(200);
    expect((await signIn(email, OLD_PASSWORD)).status).toBe(401);
  });

  it("only lets a token be used once", async () => {
    const email = await signUpMember();
    const { url, token } = await requestReset(email);

    expect((await resetPassword(token)).status).toBe(200);
    expect((await resetPassword(token, "AnotherPassword789!")).status).toBe(400);

    // The emailed link now redirects with an error instead of the token.
    const response = await auth.handler(new Request(url));
    expect(response.headers.get("location")).toBe(`${ORIGIN}/reset-password?error=INVALID_TOKEN`);
  });

  it("expires tokens after one hour", async () => {
    const email = await signUpMember();
    const before = Date.now();
    const { token } = await requestReset(email);

    const verifications = client.db().collection("verification");
    const identifier = `reset-password:${token}`;
    const stored = await verifications.findOne({ identifier });
    const ttl = stored!.expiresAt.getTime() - before;
    expect(ttl).toBeGreaterThan(59 * 60 * 1000);
    expect(ttl).toBeLessThanOrEqual(60 * 60 * 1000 + 5_000);

    await verifications.updateOne(
      { identifier },
      { $set: { expiresAt: new Date(Date.now() - 1000) } },
    );
    expect((await resetPassword(token)).status).toBe(400);
    expect((await signIn(email, OLD_PASSWORD)).status).toBe(200);
  });

  it("keeps the existing password length rules", async () => {
    const email = await signUpMember();
    const { token } = await requestReset(email);
    expect((await resetPassword(token, "short")).status).toBe(400);

    const signup = await post("/sign-up/email", {
      email: "short-password@aucklanduni.ac.nz",
      password: "short",
      name: "Short Password",
    });
    expect(signup.status).toBe(400);
  });

  it("never logs passwords or reset tokens", async () => {
    const email = await signUpMember();
    const { token } = await requestReset(email);
    await resetPassword(token);
    await resetPassword(token);

    const secrets = [token, OLD_PASSWORD, NEW_PASSWORD];
    for (const line of logged) {
      for (const secret of secrets) expect(line).not.toContain(secret);
    }
  });
});
