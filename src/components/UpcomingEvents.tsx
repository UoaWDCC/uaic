import React from "react";
import Event from "@/components/Event"


const UpcomingEvents = () => {
  const static_event_list = [
    {
      title: "BlackBull Markets Trading Comp Registrations Close",
      date: "11:59 PM Tuesday 1st April 2025"
    }, 
    {
      title: "Investing 101 with Ezekiel Ko",
      date: "Undefined"
    }
  ]

  return (
    <div className="
      text-center mt-[20px]

      lg:max-w-[600px]
    ">

      <h1 className="
        text-[28px]/[28px] mb-[28px]

        lg:text-[34px]/[28px]
      ">
        Our Upcoming Events
      </h1>

      <div className="flex flex-col gap-[26px] text-left">

        <Event event = {static_event_list[0]}/>

        <Event event = {static_event_list[1]} />

      </div>

    </div>

  );
};

export default UpcomingEvents;