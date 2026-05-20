import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  throw new Error("Please define RESEND_API_KEY in .env");
}

const resend = new Resend(resendApiKey);

const defaultFromAddress = "UAIC <onboarding@resend.dev>";

interface SendEmailParams {
  recipient?: string;
  message: string;
}

export async function sendEmail({
  recipient = "uaic@projects.wdcc.co.nz",
  message,
}: SendEmailParams) {
  const { data, error } = await resend.emails.send({
    from: defaultFromAddress,
    to: recipient,
    subject: "UAIC message",
    text: message,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
