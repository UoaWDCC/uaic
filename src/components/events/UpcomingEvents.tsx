"use client";
import React, { useState } from "react";
import { TiLocation } from "react-icons/ti";
import { IoCalendar } from "react-icons/io5";
import { LuClock9 } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";

interface Event {
  id: string;
  date: string;
  time: string;
  title: string;
  location: string;
  type: string;
  photo: string;
  description: string;
  application_link: string;
}

const events: Event[] = [
  {
    id: "event-1-2025",
    date: "25. Dec-2025",
    time: "9:00AM - 5:00PM",
    title: "Our Upcoming Christmas Present: Mr Jerry",
    location: "303S-G20",
    type: "Competition",
    photo: "/assets/jerry.webp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    application_link: "/events/event-id",
  },
  {
    id: "event-2-2025",
    date: "25. Dec-2025",
    time: "9:00AM - 5:00PM",
    title: "Our Upcoming Christmas Present: Mr Jerry",
    location: "303S-G20",
    type: "Competition",
    photo: "/assets/jerry.webp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    application_link: "/events/event-id",
  },
  {
    id: "event-3-2025",
    date: "25. Dec-2025",
    time: "9:00AM - 5:00PM",
    title:
      "Our Upcoming Christmas Present: Mr Jerry longggggggggggggggggggggggggg title",
    location: "303S-G20",
    type: "Competition",
    photo: "/assets/jerry.webp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    application_link: "/events/event-id",
  },
];

const UpcomingEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState<null | Event>(null);
  return (
    <div
      className="
      text-center mt-[20px] 
      text-black
      lg:w-full
      lg:px-[120px]
      lg:mt-[0px]
    "
    >
      <div
        className="
        px-[32px]
      "
      >
        <div
          className="
          flex flex-col items-stretch gap-[26px] 
          text-left
        "
        >
          {events.map((event: Event) => (
            <div
              key={event.id}
              className="
                lg:flex lg:flex-row lg:gap-[20px] lg:h-[180px]
            "
            >
              <div
                className="
                hidden 
                lg:block lg:w-1/7 lg:h-full flex-shrink-0
              "
              >
                <Image
                  src={event.photo}
                  alt={`${event.title} photo`}
                  className="w-full h-full object-cover rounded-3xl"
                  width={220}
                  height={220}
                />
              </div>

              <div
                className="
                  bg-white                  
                  border-2 border-grey-100 rounded-[25px]
                  w-full 
                  lg:w-auto
                  lg:flex-grow
              "
              >
                <div
                  className="
                  px-6
                  mt-6
                  lg:px-8   
                  lg:flex lg:divide-x lg:divide-grey-100     
                "
                >
                  <div className="lg:w-0 lg:flex-grow lg:pr-8 min-w-0">
                    <div
                      className="
                      inline-flex 
                      border-2 border-grey-100 rounded-[16px] 
                      divide-x py-[2px] divide-grey-100
                      text-[10px]
                      lg:text-[14px] lg:py[3px]        
                    "
                    >
                      <div
                        className="
                        px-2
                        flex items-center gap-[6px]
                      "
                      >
                        <IoCalendar className="h-[15px] lg:h-[18px]" />
                        {event.date}
                      </div>
                      <div
                        className="
                        px-2
                        flex items-center gap-[6px] 
                      "
                      >
                        <LuClock9 className="h-[15px] lg:h-[18px]" />
                        {event.time}
                      </div>
                    </div>

                    <div className="lg:w-full lg:overflow-hidden">
                      <div className="lg:overflow-x-auto">
                        <h1
                          className="
                          py-[6px] 
                          font-bold text-[15px]
                          lg:text-[30px]
                          lg:inline-block
                          lg:whitespace-nowrap
                          lg:min-w-0
                        "
                        >
                          {event.title}
                        </h1>
                      </div>
                    </div>

                    <div
                      className="
                      flex gap-[4px]
                      text-[10px]
                      lg:text-[18px]
                    "
                    >
                      <TiLocation className="h-[12px] lg:h-[25px]" />
                      {event.location}
                    </div>
                  </div>
                  <div
                    className="
                    w-full
                    flex flex-row
                    lg:w-[20%] lg:items-center lg:justify-center
                    lg:flex-col lg:gap-2
                  "
                  >
                    <div
                      className="
                      w-1/2 pr-1
                      lg:pr-0
                    "
                    >
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="
                          mt-[14px] mb-6 px-4 py-[2px] 
                          w-full

                          text-center text-[var(--darkBlue)] text-[10px]
                          border-2 rounded-[20px] 
                          
                          transition duration-500 ease-in-out

                          hover:opacity-80   
                          transform hover:scale-102

                          lg:text-[15px]
                          lg:mt-[0px] lg:mb-[0px]
                          lg:w-[140px]
                          
                        "
                      >
                        Learn More
                      </button>
                    </div>
                    <div
                      className="
                      w-1/2 pl-1
                      lg:pl-0
                    "
                    >
                      <Link href={event.application_link}>
                        <button
                          className="
                          mt-[14px] mb-6 px-4 py-[2px] 
                          w-full

                          text-center text-[white] text-[10px]
                          bg-[var(--darkBlue)]
                          border-2 rounded-[20px] 
                          
                          transition duration-500 ease-in-out

                          hover:text-white hover:opacity-80  
                          transform hover:scale-102

                          lg:text-[15px]
                          lg:mt-[0px] lg:mb-[0px]
                          lg:w-[140px]
                        "
                        >
                          Apply Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedEvent && (
          <div
            className="
              fixed inset-0 z-50 
              bg-black/20 backdrop-blur-md 
              flex justify-center items-center 
              px-4
            "
          >
            <div
              className="
                bg-white rounded-[25px]
                p-6  w-full max-w-[600px] text-left relative
              "
            >
              <div className="lg:flex">
                <div>
                  <div
                    className="
                      inline-flex 
                      border-2 border-grey-100 rounded-[16px] 
                      divide-x py-[2px] divide-grey-100
                      text-[10px]
                    "
                  >
                    <div
                      className="
                        px-2
                        flex items-center gap-[6px]
                      "
                    >
                      <IoCalendar className="h-[15px]" />
                      {selectedEvent.date}
                    </div>
                    <div
                      className="
                        px-2
                        flex items-center gap-[6px] 
                      "
                    >
                      <LuClock9 className="h-[15px]" />
                      {selectedEvent.time}
                    </div>
                  </div>
                  <h2
                    className="
                      text-lg font-semibold my-[5px]
                    "
                  >
                    {selectedEvent.title}
                  </h2>
                  <div
                    className="
                        flex items-center 
                    "
                  >
                    <div
                      className="
                        flex gap-[4px]
                        text-[14px]
                      "
                    >
                      <TiLocation className="h-[16px]" />
                      {selectedEvent.location}
                    </div>
                    <div className="pl-[4px]">
                      <span
                        className="
                          text-center text-[var(--darkBlue)] text-[12px]
                          border-3 border-[var(--darkBlue)] rounded-[20px] 
                          px-3 inline-block
                          ml-3
                        "
                      >
                        <strong>{selectedEvent.type}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:mr-10">
                  <Image
                    src={selectedEvent.photo}
                    alt={`${selectedEvent.title} photo`}
                    className="
                        w-full h-[140px] object-cover rounded-3xl my-4
                        lg:mx-6 
                      "
                  />
                </div>
              </div>

              <p
                className="
                  max-h-[120px] overflow-y-auto
                  text-[12px]
                "
              >
                {selectedEvent.description}
              </p>
              <div className="flex justify-end">
                <Link href={selectedEvent.application_link}>
                  <button
                    className="
                      mt-[14px] px-4 py-[4px] 
                      w-[110px]

                      text-center text-[white] text-[12px]
                      bg-[var(--darkBlue)]
                      border-2 rounded-[20px] 
                            
                      transition duration-500 ease-in-out

                      hover:text-white hover:opacity-80  
                      transform hover:scale-102

                      lg:text-[15px]
                    "
                  >
                    Apply Now
                  </button>
                </Link>
              </div>

              <button
                onClick={() => setSelectedEvent(null)}
                className="
                    absolute top-2 right-3
                    w-8 h-8 flex items-center justify-center
                    text-[20px] font-bold text-gray-600
                    transition duration-300 ease-in-out
                    rounded-md hover:rounded-full
                    hover:text-white hover:bg-[var(--darkBlue)]
                  "
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
