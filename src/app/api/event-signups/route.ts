import { NextRequest, NextResponse } from "next/server";
import { getPayload, ValidationError } from "payload";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import config from "@payload-config";
import { signupStatusesTakingASpot } from "@/features/events/lib/registrationStatus";
import { getMemberIdFromRequest } from "@/lib/memberSession";

//post to create a new EventSignup.
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      return NextResponse.json({ error: "User not authenticated!" }, { status: 401 });
    }

    const payload = await getPayload({ config });

    const memberId = await getMemberIdFromRequest({
      headers: request.headers,
    } as any);

    // Session check
    if (memberId) {
      const { eventId, data } = await request.json();
      const member = await payload.findByID({ collection: "member", id: memberId });

      if (!eventId) {
        return NextResponse.json(
          { error: "eventId is missing for event-signups post request" },
          { status: 400 },
        );
      }

      const {
        docs: [existingBooking],
      } = await payload.find({
        collection: "event-signups",
        where: {
          event: {
            equals: eventId,
          },
          status: {
            equals: "cancelled",
          },
          member: {
            equals: member.id,
          },
        },
      });

      const e = await payload.findByID({
        collection: "events",
        id: eventId,
      });

      if (!e) {
        return NextResponse.json(
          { error: "Event not found." },
          { status: 404 }, //Forbidden
        );
      }

      //check if closeRegistrationOnStart is True and event has started
      if (e.closeRegistrationOnStart && new Date() > new Date(e.startDate)) {
        return NextResponse.json(
          { error: "Event has already started. Registration denied." },
          { status: 401 }, //Forbidden
        );
      }
      // Membership requirement check
      if (e.requiresMembership) {
        if (!member.hasPaid) {
          return NextResponse.json(
            { error: "Active paid membership required to sign up for this event." },
            { status: 403 }, //Forbidden
          );
        }
      }

      // check if form response matches signUpForm shape
      const dataResponses = data?.responses ?? [];

      if (e.signupForm && e.signupForm.length != 0) {
        const responseMap = new Map<string, string>();
        //checks if response is an array
        if (Array.isArray(dataResponses)) {
          for (const item of dataResponses) {
            //check if each response contains field label or no.
            if (item && item.fieldLabel)
              responseMap.set(item.fieldLabel, item.value != null ? String(item.value) : ""); //if item.value is a number, then it could break the trim() test later down the code. Hence coerce value into a string.
            else {
              return NextResponse.json(
                { error: "Each response entry must include a valid fieldLabel." },
                { status: 400 },
              );
            }
          }

          for (const field of e.signupForm) {
            const question = field.label;
            const ans = responseMap.get(question);

            //missing answer for required questions
            if (field.required == true && (!ans || ans.trim() === "")) {
              return NextResponse.json(
                { error: "Response missing required answer" },
                { status: 400 },
              );
            }

            //validate option
            if (field.options && field.options.length > 0) {
              const allowedOptions = field.options.map((opt) => opt.option);
              if (ans && !allowedOptions.includes(ans)) {
                return NextResponse.json(
                  {
                    error: `Invalid choice "${ans}" for question "${question}". Allowed choices: ${allowedOptions.join(", ")}`,
                  },
                  { status: 400 },
                );
              }
            }
          }
        } else {
          return NextResponse.json(
            { error: "Responses must be provided as an array." },
            { status: 400 },
          );
        }
      }

      //checks if max capacity of event is reached.
      if (e.capacity) {
        const filter = signupStatusesTakingASpot(e.freeSlotOnCancel);

        let { totalDocs: totalSignups } = await payload.count({
          collection: "event-signups",
          where: {
            event: {
              equals: eventId,
            },
            status: {
              in: filter,
            },
          },
        });

        //account for user's cancelled signup
        if (existingBooking && !e.freeSlotOnCancel) {
          totalSignups = totalSignups - 1;
        }

        if (totalSignups >= e.capacity) {
          return NextResponse.json(
            { error: "This event has reached max capacity." },
            { status: 409 },
          ); //Conflict
        }
      }

      //if previous booking is cancelled, then reactivate that booking
      if (existingBooking) {
        const bookingId = existingBooking.id;
        const signup = await payload.update({
          collection: "event-signups",
          id: bookingId,
          data: {
            status: "confirmed",
            responses: dataResponses,
          },
        });

        console.log("Event added successfully");
        return NextResponse.json({ success: true, signup }, { status: 201 });
      }

      try {
        const signup = await payload.create({
          collection: "event-signups",
          overrideAccess: true,
          data: {
            event: eventId, // The ID of the event
            member: member.id, // The ID of the logged-in user
            status: "confirmed",
            responses: dataResponses,
          },
        });
        console.log("Event added successfully");
        return NextResponse.json({ success: true, signup }, { status: 201 });

        //TODO: triggers confirmation email and PostHog event call.
      } catch (error) {
        const err = error as { name?: string };

        //catches duplication error
        if (err.name === "ValidationError" || error instanceof ValidationError) {
          return NextResponse.json(
            { error: "You have already signed up for this event!" },
            { status: 409 },
          );
        }

        console.log("Error creating sign up for an event: ", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
      }
    }

    //rejects request if no valid session
    return NextResponse.json({ error: "User not authenticated!" }, { status: 401 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
