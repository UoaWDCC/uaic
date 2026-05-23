// To test email, run the following:
// npx tsx src/test-email.ts (assuming dotenv is already installed via pnpm)
// This sends test-email.ts at src/test-email.ts
// Output shoult look like this:
// dev@MacBook-Pro-6 uaic % npx tsx src/test-email.ts
// Sender: onboarding@resend.dev, Recipient: (our dev email)
// Email sent successfully.

import { sendEmail } from "@/lib/send-email";

export async function POST(request: Request) {
  try {
    const { recipient, message } = await request.json();

    if (typeof recipient !== "string" || typeof message !== "string") {
      return Response.json({ error: "recipient and message are required" }, { status: 400 });
    }

    const data = await sendEmail({ recipient, message });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
