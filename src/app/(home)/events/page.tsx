import React from "react";
import EventLanding from "@/components/events/EventLanding";
import RecentEvents from "@/components/events/RecentEvents";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import BlueGradient from "@/components/BlueGradient";

const page = () => {
  return (
    <div className="w-full flex flex-col items-center">
        <div className="w-full">
            <EventLanding />
        </div>
        <div className="bg-white w-full">
            <div className="
                bg-[linear-gradient(transparent,rgba(20,92,169,0.4)_50%,transparent)]
                flex flex-col items-center gap-[20px]
                w-full pb-[100px]
                cursor-pointer

                lg:bg-[radial-gradient(rgba(20,92,169,0.4)_10%,rgba(255,255,255,0.2)_70%)]
                lg:gap-[70px] 
            ">
                <h1 className="
                    text-darkBlue 
                    font-bold 
                    text-title
                    cursor-pointer
                ">
                    Upcoming Events
                </h1>

                <UpcomingEvents />
            </div>

            <div className="
                bg-[linear-gradient(transparent,rgba(20,92,169,0.4)_50%,transparent)]
                flex flex-col items-center gap-[20px]
                w-full pt-[100px] pb-[100px] mt-5 mb-20
                cursor-pointer

                lg:bg-[radial-gradient(rgba(20,92,169,0.4)_10%,rgba(255,255,255,0.2)_70%)]
                lg:gap-[70px]
            ">
                <h1 className="
                    text-darkBlue 
                    font-bold 
                    text-title
                    cursor-pointer
                ">
                    Recent Events
                </h1>

                <RecentEvents />
            </div>
            <BlueGradient/>
        </div>
    </div>
  );
};

export default page;
