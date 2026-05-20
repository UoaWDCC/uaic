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
