import "dotenv/config";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const emailRecipient = process.env.EMAIL_RECIPIENT;

if (!resendApiKey) {
  throw new Error("Please define RESEND_API_KEY in .env");
}

const resend = new Resend(resendApiKey);

const defaultFromAddress = "onboarding@resend.dev";

interface SendEmailAttachment {
  filename: string;
  content: string;
}

interface SendEmailParams {
  recipient: string;
  message: string;
  subject?: string;
  html?: string;
  attachments?: SendEmailAttachment[];
}

export async function sendEmail({
  recipient = emailRecipient!,
  message,
  subject = "UAIC message",
  html,
  attachments,
}: SendEmailParams) {
  console.log(`Sender: ${defaultFromAddress}, Recipient: ${recipient}`);
  const { data, error } = await resend.emails.send({
    from: defaultFromAddress,
    to: recipient,
    subject,
    text: message,
    html,
    attachments,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
