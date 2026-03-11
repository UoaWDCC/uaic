import React from "react";
import EventLanding from "@/components/events/EventLanding";
import RecentEvents from "@/components/events/RecentEvents";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import BlueGradient from "@/components/BlueGradient";
import { getUpcomingEvents, getRecentEvents } from "@/features/users/data/getEvents";

const page = async () => {
  // Fetch data server-side
  const upcomingEvents = await getUpcomingEvents();
  const recentEvents = await getRecentEvents();

  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full">
        <EventLanding />
      </div>
      <div className="w-full bg-white">
        <div className="flex w-full cursor-pointer flex-col items-center gap-[20px] bg-[linear-gradient(transparent,rgba(20,92,169,0.4)_50%,transparent)] px-[16px] pb-[100px] lg:gap-[70px] lg:bg-[radial-gradient(rgba(20,92,169,0.4)_10%,rgba(255,255,255,0.2)_70%)] lg:px-[120px]">
          <h1 className="text-darkBlue text-title cursor-pointer font-bold">Upcoming Events</h1>

          <UpcomingEvents events={upcomingEvents} />
        </div>

        <div className="mt-5 mb-20 flex w-full cursor-pointer flex-col items-center gap-[20px] bg-[linear-gradient(transparent,rgba(20,92,169,0.4)_50%,transparent)] px-[16px] pt-[100px] pb-[100px] lg:gap-[70px] lg:bg-[radial-gradient(rgba(20,92,169,0.4)_10%,rgba(255,255,255,0.2)_70%)] lg:px-[120px]">
          <h1 className="text-darkBlue text-title cursor-pointer font-bold">Recent Events</h1>

          <RecentEvents events={recentEvents} />
        </div>
        <BlueGradient />
      </div>
    </div>
  );
};

export default page;
