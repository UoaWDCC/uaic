import "dotenv/config";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const emailRecipient = process.env.EMAIL_RECIPIENT;

if (!resendApiKey) {
  throw new Error("Please define RESEND_API_KEY in .env");
}

const resend = new Resend(resendApiKey);

const defaultFromAddress = "onboarding@resend.dev";

interface SendEmailParams {
  recipient: string;
  message: string;
}

export async function sendEmail({ recipient = emailRecipient!, message }: SendEmailParams) {
  console.log(`Sender: ${defaultFromAddress}, Recipient: ${emailRecipient}`);
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
