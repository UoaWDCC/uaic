"use client";
import React, { useState } from "react";
import { FiEdit2, FiArrowUpRight } from "react-icons/fi";

type DetailField = {
  label: string;
  value: string;
};

type UpcomingEvent = {
  day: string;
  month: string;
  title: string;
  detail: string;
};

interface CardProps {
  children: React.ReactNode;
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  onEdit?: () => void;
}

const personalDetails: DetailField[] = [
  { label: "Full Name", value: "Test Name" },
  { label: "Student ID", value: "12345" },
  { label: "University Email", value: "email@aucklanduni.ac.nz" },
  { label: "Phone Number", value: "••• ••• ••••" },
  { label: "Degree / Programme", value: "BA Business" },
  { label: "Year of Study", value: "3rd Year" },
];

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

const Card = ({ children }: CardProps) => {
  return <div className="rounded-2xl bg-white p-6 shadow-sm">{children}</div>;
};

const CardHeader = ({ title, subtitle, onEdit }: CardHeaderProps) => {
  return (
    <div className="mb-5 flex items-start justify-between">
      <div>
        <p className="text-darkBlue text-xl font-bold">{title}</p>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {onEdit && (
        <button
          onClick={onEdit}
          className="bg-lightBlue grid h-9 w-9 shrink-0 place-items-center rounded-full text-blue-600 hover:cursor-pointer"
        >
          <FiEdit2 size={16} />
        </button>
      )}
    </div>
  );
};

const Toggle = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <button
      onClick={() => setIsOn(!isOn)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors hover:cursor-pointer ${
        isOn ? "bg-blue-600" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          isOn ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
};

const MembershipDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-sm font-bold tracking-wide text-blue-500 uppercase">
          Membership Dashboard
        </p>
        <h1 className="text-header text-darkBlue mt-1 font-bold">Welcome Back, Test</h1>
        <p className="text-body mt-2 max-w-2xl text-slate-500">
          Manage your details, track your event RSVPs, and tell us what kind of investing content
          you want more of.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Personal details */}
          <Card>
            <CardHeader
              title="Personal details"
              subtitle="Visible to club admin only"
              onEdit={() => {}}
            />
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              {personalDetails.map((field) => (
                <div key={field.label}>
                  <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                    {field.label}
                  </p>
                  <p className="text-darkBlue mt-1">{field.value}</p>
                </div>
              ))}
            </div>
            <hr className="border-grey-200 my-6 border-t" />
            <button className="font-medium text-blue-600 hover:cursor-pointer hover:underline">
              Change Password
            </button>
          </Card>

          {/* Membership */}
          <Card>
            <CardHeader title="Membership" />
            <div className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 p-5 text-white">
              <p className="text-lg font-bold">General Member</p>
              <p className="mt-1 text-sm text-blue-100">Valid until end of 2026</p>
            </div>
            <hr className="border-grey-200 my-6 border-t" />
            <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
              Member Since
            </p>
            <p className="text-darkBlue mt-1">March 2026</p>
          </Card>

          {/* Upcoming events */}
          <Card>
            <CardHeader
              title="Your upcoming events"
              subtitle={`${upcomingEvents.length} events confirmed`}
              onEdit={() => {}}
            />
            <div>
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="border-grey-200 flex items-center gap-4 border-b py-4 last:border-0"
                >
                  <div className="bg-lightBlue grid h-14 w-14 shrink-0 place-items-center rounded-lg">
                    <span className="text-darkBlue text-lg leading-none font-bold">
                      {event.day}
                    </span>
                    <span className="mt-0.5 text-[10px] font-medium tracking-wide text-slate-500 uppercase">
                      {event.month}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-darkBlue font-semibold">{event.title}</p>
                    <p className="mt-0.5 text-sm text-slate-500">{event.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white hover:cursor-pointer">
              <FiArrowUpRight size={18} />
              View All events
            </button>
          </Card>

          {/* Bulletin preferences */}
          <Card>
            <CardHeader
              title="Bulletin Preferences"
              subtitle="Adjust your notification preferences here."
            />
            <div>
              {[1, 2, 3, 4].map((preference) => (
                <div
                  key={preference}
                  className="border-grey-200 flex items-center justify-between border-b py-4 last:border-0"
                >
                  <p className="text-darkBlue font-semibold">Preference</p>
                  <Toggle />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* TODO: paste the sign out button from UserInfo.tsx here */}
      </div>
    </div>
  );
};

export default MembershipDashboard;
