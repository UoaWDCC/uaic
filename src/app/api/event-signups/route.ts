import { NextRequest, NextResponse } from "next/server";
import { getPayload, ValidationError } from "payload";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import config from "@payload-config";
import { signupStatusesTakingASpot } from "@/features/events/lib/registrationStatus";
import { getMemberIdFromRequest } from "@/lib/memberSession";
import { validateSignupResponses } from "@/lib/validateSignupResponses";

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
    if (!memberId) {
      return NextResponse.json({ error: "User not authenticated!" }, { status: 401 });
    }

    const { eventId, data } = await request.json();
    const member = await payload.findByID({ collection: "member", id: memberId });

    if (!member) {
      return NextResponse.json({ error: "Unable to find member with such id" }, { status: 400 });
    }

    if (!eventId) {
      return NextResponse.json(
        { error: "eventId is missing for event-signups post request" },
        { status: 400 },
      );
    }

    const e = await payload.findByID({
      collection: "events",
      id: eventId,
    });

    if (!e) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    //check if closeRegistrationOnStart is True and event has started
    if (e.closeRegistrationOnStart && new Date() >= new Date(e.startDate)) {
      return NextResponse.json(
        { error: "Event has already started. Registration denied." },
        { status: 409 },
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

    // check if form response matches signUpForm shape, if so returns the cleaned response.
    const result = validateSignupResponses(e.signupForm, data?.responses);

    if (!result.ok) {
      return NextResponse.json({ error: result.errors }, { status: 400 });
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

    //checks if max capacity of event is reached.
    if (e.capacity !== undefined && e.capacity !== null) {
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
          responses: result.responses,
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
          responses: result.responses,
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
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
