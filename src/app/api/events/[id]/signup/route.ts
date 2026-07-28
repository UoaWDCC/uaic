import { getPayload } from "@/lib/payload";
import { generateGoogleCalendar } from "@/lib/generateGoogleCalendar";
import { generateICS } from "@/lib/generateICS";
import { sendEmail } from "@/lib/send-email";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { name, email } = await request.json();

    if (typeof name !== "string" || typeof email !== "string") {
      return Response.json({ error: "name and email are required" }, { status: 400 });
    }

    const payload = await getPayload();

    const event = await payload.findByID({ collection: "events" as any, id }).catch(() => null);

    if (!event) {
      return Response.json({ error: "Event not found" }, { status: 404 });
    }

    const icsEvent = {
      startdate: new Date(event.startDate),
      enddate: new Date(event.endDate),
      title: event.event,
      description: event.description,
      location: event.location,
    };

    const { error: icsError, value: icsValue } = generateICS(icsEvent);

    if (icsError || !icsValue) {
      return Response.json({ error: "Failed to generate calendar invite" }, { status: 500 });
    }

    const googleCalendarUrl = generateGoogleCalendar(icsEvent);

    const text =
      `Hi ${name},\n\n` +
      `You're confirmed for ${event.event}.\n\n` +
      `Add it to Google Calendar: ${googleCalendarUrl}\n\n` +
      `A calendar invite (.ics) is attached for other calendar apps.`;

    const html =
      `<p>Hi ${name},</p>` +
      `<p>You're confirmed for <strong>${event.event}</strong>.</p>` +
      `<p><a href="${googleCalendarUrl}">Add to Google Calendar</a></p>` +
      `<p>A calendar invite (.ics) is attached for other calendar apps.</p>`;

    await sendEmail({
      recipient: email,
      subject: `You're confirmed: ${event.event}`,
      message: text,
      html,
      attachments: [
        {
          filename: "event.ics",
          content: Buffer.from(icsValue).toString("base64"),
        },
      ],
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Error signing up for event:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
