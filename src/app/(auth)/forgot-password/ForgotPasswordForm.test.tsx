// Component tier: auth-client is mocked, so only the page's own behaviour is
// under test - the real request is covered by tests/integration/password-reset.
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ForgotPasswordForm from "./ForgotPasswordForm";

const requestPasswordReset = vi.hoisted(() => vi.fn());
vi.mock("@/lib/auth-client", () => ({ requestPasswordReset }));

beforeEach(() => {
  requestPasswordReset.mockReset();
  requestPasswordReset.mockResolvedValue({ data: { status: true }, error: null });
});

const emailInput = () => screen.getByRole("textbox", { name: "Email" });
const submitButton = () => screen.getByRole("button", { name: /send reset link|sending/i });

const submit = (email: string) => {
  fireEvent.change(emailInput(), { target: { value: email } });
  fireEvent.click(submitButton());
};

describe("ForgotPasswordForm", () => {
  it("renders the request step with a labelled email field and a link back to login", () => {
    render(<ForgotPasswordForm />);

    expect(screen.getByRole("heading", { level: 1, name: "Forgot password?" })).toBeInTheDocument();
    expect(emailInput()).toBeRequired();
    expect(screen.getByRole("link", { name: "Back to log in" })).toHaveAttribute("href", "/login");
  });

  it("rejects an invalid email without sending a request", () => {
    render(<ForgotPasswordForm />);

    submit("not-an-email");

    expect(requestPasswordReset).not.toHaveBeenCalled();
    expect(emailInput()).toHaveAttribute("aria-invalid", "true");
  });

  it("sends the trimmed email and then shows the check-your-email view", async () => {
    render(<ForgotPasswordForm />);

    submit("  member@aucklanduni.ac.nz ");

    expect(
      await screen.findByRole("heading", { level: 1, name: "Check your email" }),
    ).toBeInTheDocument();
    expect(requestPasswordReset).toHaveBeenCalledWith("member@aucklanduni.ac.nz");
    expect(screen.getByText("member@aucklanduni.ac.nz")).toBeInTheDocument();
    expect(screen.queryByRole("textbox", { name: "Email" })).not.toBeInTheDocument();
  });

  it("disables the button and shows progress while the request is pending", async () => {
    let resolve!: (value: unknown) => void;
    requestPasswordReset.mockReturnValue(new Promise((r) => (resolve = r)));
    render(<ForgotPasswordForm />);

    submit("member@aucklanduni.ac.nz");

    expect(submitButton()).toBeDisabled();
    expect(submitButton()).toHaveTextContent("Sending...");

    resolve({ data: { status: true }, error: null });
    expect(await screen.findByRole("heading", { name: "Check your email" })).toBeInTheDocument();
  });

  it.each([
    ["the request throws (network failure)", () => Promise.reject(new TypeError("fetch failed"))],
    [
      "Better Auth returns an error",
      () => Promise.resolve({ data: null, error: { status: 429, message: "Too many requests" } }),
    ],
  ])("announces an error and stays on the form when %s", async (_, response) => {
    requestPasswordReset.mockImplementation(response);
    render(<ForgotPasswordForm />);

    submit("member@aucklanduni.ac.nz");

    expect(await screen.findByRole("alert")).toHaveTextContent(/couldn't send the reset link/i);
    expect(screen.getByRole("heading", { name: "Forgot password?" })).toBeInTheDocument();
    expect(submitButton()).toBeEnabled();
  });

  describe("check your email", () => {
    const renderSent = async () => {
      render(<ForgotPasswordForm />);
      submit("member@aucklanduni.ac.nz");
      await screen.findByRole("heading", { name: "Check your email" });
    };

    it("moves focus to the confirmation message", async () => {
      await renderSent();

      expect(document.activeElement).toHaveTextContent(/if an account exists for/i);
    });

    it("resends to the same email", async () => {
      await renderSent();

      fireEvent.click(screen.getByRole("button", { name: "Resend email" }));

      expect(await screen.findByRole("status")).toHaveTextContent(/sent another link/i);
      expect(requestPasswordReset).toHaveBeenCalledTimes(2);
      expect(requestPasswordReset).toHaveBeenLastCalledWith("member@aucklanduni.ac.nz");
    });

    it("announces a failed resend", async () => {
      await renderSent();
      requestPasswordReset.mockRejectedValue(new TypeError("fetch failed"));

      fireEvent.click(screen.getByRole("button", { name: "Resend email" }));

      expect(await screen.findByRole("alert")).toHaveTextContent(/couldn't send the reset link/i);
    });

    it("goes back to an empty form to use a different email", async () => {
      await renderSent();

      fireEvent.click(screen.getByRole("button", { name: "Use a different email" }));

      expect(screen.getByRole("heading", { name: "Forgot password?" })).toBeInTheDocument();
      expect(emailInput()).toHaveValue("");
    });

    it("links back to login", async () => {
      await renderSent();

      expect(screen.getByRole("link", { name: "Back to log in" })).toHaveAttribute(
        "href",
        "/login",
      );
    });
  });
});
