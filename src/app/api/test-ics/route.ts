import { generateICS } from "@/lib/generateICS";
import { generateGoogleCalendar } from "../../../lib/generateGoogleCalender";

export function GET() {
  const inputEvent = {
    startdate: new Date("2026-05-29T23:00:00"),
    enddate: new Date("2026-05-29T23:00:00"),
    title: "Test Event",
    description: "This is a test event.",
    location: "123 Main St, Anytown, USA",
  };

  const event = generateICS(inputEvent);

  if (event.error) {
    return Response.json({
      ok: false,
      message: "ICS generation failed",
      details: event.error,
    });
  }

  const googleCalendarUrl = generateGoogleCalendar(inputEvent);

  return new Response(event.value + "\n" + googleCalendarUrl, {
    headers: {
      "Content-Type": "text/plain",
      //"Content-Disposition": `attachment; filename="${inputEvent.title}.ics"`,
    },
  });
}
