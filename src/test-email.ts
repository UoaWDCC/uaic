import "dotenv";
import { sendEmail } from "./lib/send-email"; // adjust path if needed

const EMAIL_RECIPIENT = process.env.EMAIL_RECIPIENT;

async function main() {
  await sendEmail({
    recipient: EMAIL_RECIPIENT!,
    message: "test",
  });

  console.log("Email sent successfully.");
}

main().catch(console.error);
