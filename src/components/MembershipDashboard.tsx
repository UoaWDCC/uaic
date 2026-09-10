"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEdit2, FiArrowUpRight, FiLogOut } from "react-icons/fi";
import { signOut } from "@/lib/auth-client";

type SessionUser = {
  name: string;
  email: string;
};

export type MemberProfile = {
  studentId: string;
  universityYear: "year1" | "year2" | "year3" | "year4" | "year5Plus" | "postgraduate";
  phoneNumber: string;
  degree: string;
  hasPaid: boolean;
  paymentDate?: string | null;
};

interface MembershipDashboardProps {
  user: SessionUser;
  member: MemberProfile | null;
}

const YEAR_LABELS: Record<MemberProfile["universityYear"], string> = {
  year1: "1st Year",
  year2: "2nd Year",
  year3: "3rd Year",
  year4: "4th Year",
  year5Plus: "5th Year+",
  postgraduate: "Postgraduate",
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

const formatMemberSince = (paymentDate?: string | null) => {
  if (!paymentDate) return "—";
  return new Date(paymentDate).toLocaleDateString("en-NZ", { month: "long", year: "numeric" });
};

const MembershipDashboard = ({ user, member }: MembershipDashboardProps) => {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [studentId, setStudentId] = useState(member?.studentId ?? "");
  const [phoneNumber, setPhoneNumber] = useState(member?.phoneNumber ?? "");
  const [degree, setDegree] = useState(member?.degree ?? "");
  const [universityYear, setUniversityYear] = useState<MemberProfile["universityYear"] | "">(
    member?.universityYear ?? "",
  );

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    router.push("/login");
  };

  const handleCancelEdit = () => {
    setName(user.name);
    setStudentId(member?.studentId ?? "");
    setPhoneNumber(member?.phoneNumber ?? "");
    setDegree(member?.degree ?? "");
    setUniversityYear(member?.universityYear ?? "");
    setError(null);
    setIsEditingDetails(false);
  };

  const handleSaveDetails = async () => {
    if (!name.trim()) {
      setError("Name can't be empty.");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/account/details", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          studentId: studentId.trim(),
          degrees: degree.trim(),
          universityYear,
        }),
      });
      if (!res.ok) throw new Error("Failed to update details");
      setIsEditingDetails(false);
      router.refresh();
    } catch (err) {
      console.error("Failed to save details:", err);
      setError("Couldn't save your details. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const personalDetails = [
    {
      label: "Full Name",
      value: isEditingDetails ? (
        <div className="flex items-center gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-[8px] border border-[#005EAF] px-2 py-2 text-sm"
            autoFocus
          />
        </div>
      ) : (
        user.name || "—"
      ),
    },
    {
      label: "Student ID",
      value: isEditingDetails ? (
        <div className="flex items-center gap-2">
          <input
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full rounded-[8px] border border-[#005EAF] px-2 py-2 text-sm"
            autoFocus
          />
        </div>
      ) : (
        member?.studentId || "—"
      ),
    },
    {
      label: "University Email",
      value: isEditingDetails ? (
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-[8px] border border-[#005EAF] px-2 py-2 text-sm"
        />
      ) : (
        user.email
      ),
    },
    {
      label: "Phone Number",
      value: isEditingDetails ? (
        <div className="flex items-center gap-2">
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full rounded-[8px] border border-[#005EAF] px-2 py-2 text-sm"
            autoFocus
          />
        </div>
      ) : (
        member?.phoneNumber || "—"
      ),
    },
    {
      label: "Degree / Programme",
      value: isEditingDetails ? (
        <div className="flex items-center gap-2">
          <input
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className="w-full rounded-[8px] border border-[#005EAF] px-2 py-2 text-sm"
            autoFocus
          />
        </div>
      ) : (
        member?.degree || "—"
      ),
    },
    {
      label: "Year of Study",
      value: isEditingDetails ? (
        <div className="flex items-center gap-2">
          <select
            value={universityYear}
            onChange={(e) =>
              setUniversityYear(e.target.value as MemberProfile["universityYear"] | "")
            }
            className="w-full appearance-none rounded-[8px] border border-[#005EAF] px-2 py-2 text-sm"
          >
            <option value="">—</option>
            {Object.entries(YEAR_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
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
        <p className="text-sm font-bold tracking-wide text-blue-500 uppercase">
          Membership Dashboard
        </p>
        <h1 className="text-header text-darkBlue mt-1 font-bold">
          Welcome Back, {user.name?.split(" ")[0] || "Member"}
        </h1>
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
              onEdit={() => setIsEditingDetails(true)}
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

            <hr className="mt-5 mb-4 border-t border-[#E2E9F2]" />
            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            <div className="flex justify-between">
              <button className="text-sm font-medium text-[#005EAF] hover:cursor-pointer hover:underline">
                Change Password
              </button>

              {isEditingDetails && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCancelEdit}
                    disabled={saving}
                    className="rounded-[8px] border-2 border-[#E2E9F2] px-5 py-2 text-sm font-medium text-slate-500 hover:cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveDetails}
                    disabled={saving}
                    className="rounded-[8px] bg-gradient-to-r from-[#249AFF] to-[#005EAF] px-5 py-2 text-sm font-semibold text-white hover:cursor-pointer disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </div>
          </Card>

          {/* Membership */}
          <Card>
            <CardHeader title="Membership" />
            <div className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 p-5 text-white">
              <p className="text-lg font-bold">
                {member?.hasPaid ? "Active Member" : "Membership Pending"}
              </p>
              {!member && <p className="mt-1 text-sm text-blue-100">No membership on file yet</p>}
            </div>
            <hr className="border-grey-200 my-6 border-t" />
            <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
              Member Since
            </p>
            <p className="text-darkBlue mt-1">{formatMemberSince(member?.paymentDate)}</p>
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
