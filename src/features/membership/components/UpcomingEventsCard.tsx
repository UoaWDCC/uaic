import ArrowButton from "@/components/ArrowButton";
import { UpcomingEvent } from "../types";

const upcomingEvents: UpcomingEvent[] = [
  {
    day: "14",
    month: "Jul",
    title: "Networking Event: Innovators in Finance",
    detail: "5:30 PM • OGGB Atrium",
  },
  {
    day: "14",
    month: "Jul",
    title: "Networking Event: Innovators in Finance",
    detail: "5:30 PM • OGGB Atrium",
  },
];

const UpcomingEventsCard = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-primary text-xl font-bold">Your upcoming events</p>
          <p className="mt-1 text-sm text-slate-500">{upcomingEvents.length} events confirmed</p>
        </div>
      </div>
      <div>
        {upcomingEvents.map((event, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border-b border-[#E2E9F2] py-4 last:border-0"
          >
            <div className="bg-surface-faint grid h-14 w-14 shrink-0 place-items-center rounded-lg">
              <span className="text-primary text-lg leading-none font-bold">{event.day}</span>
              <span className="mt-0.5 text-[10px] font-medium tracking-wide text-slate-500 uppercase">
                {event.month}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-primary font-semibold">{event.title}</p>
              <p className="mt-0.5 text-sm text-slate-500">{event.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <hr className="border-t border-[#E2E9F2]" />
      <div className="w-1/4 pt-4">
        <ArrowButton text="View All Events" openInNewTab={true} link="/events" />
      </div>
    </div>
  );
};

export default UpcomingEventsCard;
