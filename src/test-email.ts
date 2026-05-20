import { sendEmail } from "./lib/send-email"; // adjust path if needed

async function main() {
  await sendEmail({
    recipient: "uaic@projects.wdcc.co.nz",
    message: "test",
  });

  console.log("Email sent successfully.");
}

main().catch(console.error);
