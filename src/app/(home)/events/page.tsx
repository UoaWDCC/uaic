import React from "react";
import EventLanding from "@/components/events/EventLanding";
import RecentEvents from "@/components/events/RecentEvents";
import UpcomingEvents from "@/components/events/UpcomingEvents";

const page = () => {
  return (
    <div className="w-full flex flex-col items-center">
        <div className="w-full">
            <EventLanding />
        </div>

        <div className="
            bg-[radial-gradient(rgba(20,92,169,0.4)_10%,rgba(255,255,255,0.2)_70%)]
            flex flex-col items-center gap-[20px]
            w-full pt-[100px] pb-[100px] mt-10

            lg:gap-[70px]
        ">
            <h1 className="
                text-darkBlue 
                font-[590] 
                
                lg:text-2xl
            ">
                Upcoming Events
            </h1>

            <UpcomingEvents />
        </div>

        <div className="
            bg-[radial-gradient(rgba(20,92,169,0.4)_10%,rgba(255,255,255,0.2)_70%)]
            flex flex-col items-center gap-[20px]
            w-full pt-[100px] pb-[100px] mt-10

            lg:gap-[70px]
        ">
            <h1 className="
                text-darkBlue 
                font-[590] 
                
                lg:text-2xl
            ">
                Recent Events
            </h1>

            <RecentEvents />
        </div>
    </div>
  );
};

export default page;
