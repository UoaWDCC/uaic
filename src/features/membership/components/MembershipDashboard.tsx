"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEdit2, FiLogOut } from "react-icons/fi";
import { signOut } from "@/lib/auth-client";
import Link from "next/link";
import ArrowButton from "@/components/ArrowButton";
import { maskPhoneNumber } from "../utils/maskPhoneNumber";
import { maskStudentID } from "../utils/maskStudentID";
import { MemberProfile, SessionUser, UpcomingEvent } from "../types";
import SaveButton from "./SaveButton";
import CancelButton from "./CancelButton";
import { savePersonalDetails } from "../data/savePersonalDetails";

interface MembershipDashboardProps {
  user: SessionUser;
  member: MemberProfile | null;
}

const YEAR_LABELS: Record<MemberProfile["universityYear"], string> = {
  unknown: "—",
  year1: "1st Year",
  year2: "2nd Year",
  year3: "3rd Year",
  year4: "4th Year",
  year5Plus: "5th Year+",
  postgraduate: "Postgraduate",
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  onEdit?: () => void;
  isEditing?: boolean;
}

const CardHeader = ({ title, subtitle, onEdit, isEditing }: CardHeaderProps) => {
  return (
    <div className="mb-5 flex items-start justify-between">
      <div>
        <p className="text-primary text-xl font-bold">{title}</p>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {onEdit && !isEditing && (
        <button
          onClick={onEdit}
          className="bg-surface-faint grid h-9 w-9 shrink-0 place-items-center rounded-full text-blue-600 hover:cursor-pointer"
        >
          <FiEdit2 size={16} />
        </button>
      )}
    </div>
  );
};

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

const Card = ({ children, className }: CardProps) => {
  return <div className={`rounded-2xl bg-white p-6 shadow-sm ${className ?? ""}`}>{children} </div>;
};

const formatMemberSince = (paymentDate?: string | null) => {
  if (!paymentDate) return "—";
  return new Date(paymentDate).toLocaleDateString("en-NZ", { month: "long", year: "numeric" });
};

const MembershipDashboard = ({ user, member }: MembershipDashboardProps) => {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  /* Personal Details */
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(`${member?.firstName ?? ""} ${member?.lastName ?? ""}`.trim());
  const [email, setEmail] = useState(user.email);
  const [studentId, setStudentId] = useState(member?.studentId ?? "");
  const [phoneNumber, setPhoneNumber] = useState(member?.phoneNumber ?? "");
  const [degrees, setDegrees] = useState(member?.degrees ?? "");
  const [universityYear, setUniversityYear] = useState<MemberProfile["universityYear"]>(
    member?.universityYear ?? "unknown",
  );

  /* Checks if the email has a valid abc@xyz format with only one '@' */
  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    router.push("/login");
  };

  /* Resets the input fields */
  const handleCancelEdit = () => {
    setName(`${member?.firstName ?? ""} ${member?.lastName ?? ""}`.trim());
    setStudentId(member?.studentId ?? "");
    setPhoneNumber(member?.phoneNumber ?? "");
    setDegrees(member?.degrees ?? "");
    setUniversityYear(member?.universityYear ?? "unknown");
    setError(null);
    setEmail(user.email);
    setIsEditingDetails(false);
  };

  /* splits users full name from input field to fit into first and last name field */
  const splitName = (fullName: string) => {
    const [first, ...rest] = fullName.trim().split(" ");
    return { firstName: first ?? "", lastName: rest.join(" ") };
  };

  const handleSaveDetails = async () => {
    if (!name.trim()) {
      setError("Name can't be empty.");
      return;
    }

    if (!isValidEmail(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const { firstName, lastName } = splitName(name);
      await savePersonalDetails(
        { firstName, lastName, studentId, degrees, universityYear, phoneNumber },
        { email: user.email },
      );
      setIsEditingDetails(false);
      router.refresh();
    } catch (err) {
      console.error("Failed to save details:", err);
      setError(err instanceof Error ? err.message : "Couldn't save your details. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const personalDetails = [
    {
      label: "Full Name",
      value: isEditingDetails ? (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex w-full items-center gap-2 rounded-lg border border-[#005EAF] px-2 py-2 text-sm"
          autoFocus
        />
      ) : (
        `${member?.firstName ?? ""} ${member?.lastName ?? ""}`.trim() || "—"
      ),
    },
    {
      label: "Student ID",
      value: isEditingDetails ? (
        <input
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="flex w-full items-center gap-2 rounded-lg border border-[#005EAF] px-2 py-2 text-sm"
        />
      ) : (
        maskStudentID(member?.studentId ?? "")
      ),
    },
    {
    {
      label: "University Email",
      user.email
     }
    },
    {
      label: "Phone Number",
      value: isEditingDetails ? (
        <input
          type="tel"
          inputMode="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full rounded-lg border border-[#005EAF] px-2 py-2 text-sm"
          autoComplete="tel"
        />
      ) : (
        maskPhoneNumber(member?.phoneNumber ?? "")
      ),
    },
    {
      label: "Degree / Programme",
      value: isEditingDetails ? (
        <input
          value={degrees}
          onChange={(e) => setDegrees(e.target.value)}
          className="w-full rounded-lg border border-[#005EAF] px-2 py-2 text-sm"
        />
      ) : (
        member?.degrees || "—"
      ),
    },
    {
      label: "Year of Study",
      value: isEditingDetails ? (
        <select
          value={universityYear}
          onChange={(e) => setUniversityYear(e.target.value as MemberProfile["universityYear"])}
          className="w-full appearance-none rounded-lg border border-[#005EAF] px-2 py-2 text-sm"
        >
          {Object.entries(YEAR_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      ) : member?.universityYear && YEAR_LABELS[member.universityYear] ? (
        YEAR_LABELS[member.universityYear]
      ) : (
        "—"
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="text-sm font-bold tracking-wide text-[#249AFF] uppercase">
          Membership Dashboard
        </div>
        <div className="inline-flex items-center gap-2">
          <div className="text-primary mt-1 text-xl font-extrabold md:text-2xl">
            Welcome Back, {member?.firstName || "Member"}
          </div>
          {member?.hasPaid && (
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#E7F7EE] px-3 py-2 text-[2vw] font-semibold text-[#1B7A43] md:text-xs">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#1B7A43]" />
              Active member
            </div>
          )}
        </div>
        <div className="mt-2 max-w-2xl text-sm text-slate-500">
          Manage your details, track your event RSVPs, and tell us what kind of investing content
          you want more of.
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Personal details */}
          <Card>
            <CardHeader
              title="Personl details"
              subtitle="Visible to club admin only"
              onEdit={() => setIsEditingDetails(true)}
              isEditing={isEditingDetails}
            />
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              {personalDetails.map((field) => (
                <div key={field.label}>
                  <div className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                    {field.label}
                  </div>
                  <p className="text-primary mt-1">{field.value}</p>
                </div>
              ))}
            </div>

            <hr className="mt-5 mb-4 border-t border-[#E2E9F2]" />
            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            <div className="flex justify-between">
              <button className="text-sm font-semibold text-[#005EAF] hover:cursor-pointer hover:underline">
                Change Password
              </button>

              {isEditingDetails && (
                <div className="flex items-center gap-3">
                  <CancelButton onClick={handleCancelEdit} disabled={saving} />
                  <SaveButton onClick={handleSaveDetails} saving={saving} />
                </div>
              )}
            </div>
          </Card>

          {/* Membership */}
          <Card>
            <CardHeader title="Membership" />
            <div className="flex justify-between rounded-2xl bg-linear-to-r from-[#249AFF] to-[#005EAF] p-5 text-white">
              <div className="flex-col">
                <div className="text-m text-xl font-bold">
                  {member?.hasPaid ? "General Member" : "Membership Pending"}
                  {!member && (
                    <p className="mt-1 text-sm text-blue-100">No membership on file yet</p>
                  )}
                </div>
                <div className="text-#FFFFFF text-#FFFFFF text-xs">
                  {member?.hasPaid ? "Valid until end of 2026" : ""}
                </div>
              </div>
              <div className="my-auto">
                <Link href="/">
                  {" "}
                  {/* empty link ?*/}
                  <button className="rounded-4xl bg-[#FFFFFF2E] px-3 py-2 text-xs font-semibold">
                    Renews auto.
                  </button>
                </Link>
              </div>
            </div>
            {member?.hasPaid && (
              <>
                <div className="flex w-full pt-7">
                  <div className="w-1/2 flex-col">
                    <div className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                      Member Since
                    </div>
                    <p className="text-primary mt-1">{formatMemberSince(member?.paymentDate)}</p>
                  </div>
                  <div className="w-1/2 flex-col">
                    <div className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                      Chapter
                    </div>
                    <p className="mt-1 text-[#0B1A2B]">Auckland CBD</p>
                  </div>
                </div>
                <hr className="mt-4 border-t border-[#E2E9F2] pb-6 md:mt-15 md:pb-0" />
              </>
            )}
          </Card>

          {/* Upcoming events */}
          <Card className="lg:col-span-2">
            <CardHeader
              title="Your upcoming events"
              subtitle={`${upcomingEvents.length} events confirmed`}
              onEdit={() => {}}
            />
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
                  <hr className="mt-4 border-t border-[#E2E9F2] pb-6 md:mt-15 md:pb-0" />
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
          </Card>
        </div>

        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="mt-8 inline-flex items-center gap-2 font-medium text-red-600 hover:cursor-pointer hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FiLogOut size={16} />
          {signingOut ? "Signing out..." : "Sign Out"}
        </button>
      </div>
    </div>
  );
};

export default MembershipDashboard;
