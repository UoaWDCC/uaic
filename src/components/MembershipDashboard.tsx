"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEdit2, FiLogOut, FiExternalLink, FiArrowUpRight } from "react-icons/fi";
import { signOut } from "@/lib/auth-client";
import Link from "next/link";

type SessionUser = {
  name: string;
  email: string;
};

export type MemberProfile = {
  studentId: string;
  universityYear: "year1" | "year2" | "year3" | "year4" | "year5Plus" | "postgraduate";
  phoneNumber: string;
  degrees: string;
  firstName: string;
  lastName: string;
  hasPaid: boolean;
  paymentDate?: string | null;
  experienceLevel?: ExperienceLevel | null;
  areasOfInterest?: string[] | null;
  linkedinHandle?: string | null;
  caseCompetitionInterest?: boolean | null;
};

interface MembershipDashboardProps {
  user: SessionUser;
  member: MemberProfile | null;
}

export type Membership = {
  membershipType: "General Membership";
  validYear: string;
};

const YEAR_LABELS: Record<MemberProfile["universityYear"], string> = {
  year1: "1st Year",
  year2: "2nd Year",
  year3: "3rd Year",
  year4: "4th Year",
  year5Plus: "5th Year+",
  postgraduate: "Postgraduate",
};

type ExperienceLevel = "beginner" | "intermediate" | "advanced";

const EXPERIENCE_LEVELS: { value: ExperienceLevel; label: string }[] = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const INTEREST_OPTIONS = [
  "Equities",
  "Crypto",
  "Macro",
  "Options",
  "ESG",
  "Fixed Income",
  "Venture / Startups",
] as const;

type UpcomingEvent = {
  day: string;
  month: string;
  title: string;
  detail: string;
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
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

const Card = ({ children, className }: CardProps) => {
  return <div className={`rounded-2xl bg-white p-6 shadow-sm ${className ?? ""}`}>{children} </div>;
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

const formatMemberSince = (paymentDate?: string | null) => {
  if (!paymentDate) return "—";
  return new Date(paymentDate).toLocaleDateString("en-NZ", { month: "long", year: "numeric" });
};

const maskStudentID = (value: string, visibleChars = 2) => {
  if (!value) {
    return "—";
  }
  const studentID = value.trim();
  const masked = "•".repeat(studentID.length - visibleChars);
  return masked + studentID.slice(-visibleChars);
};

const maskPhoneNumber = (value: string, visibleDigits = 2) => {
  if (!value) {
    return "—";
  }
  const digitsOnly = value.replace(/\D/g, ""); /* strip non-digits */
  if (digitsOnly.length <= visibleDigits) return value;

  const visible = digitsOnly.slice(-visibleDigits);
  const maskedLength = digitsOnly.length - visibleDigits;

  const groups: string[] = [];
  let remaining = maskedLength;
  const chunkSizes = [4, 3, 3]; /* adjust to match typical NZ mobile format: 0XX XXX XXXX */
  for (const size of chunkSizes) {
    if (remaining <= 0) break;
    const take = Math.min(size, remaining);
    groups.push("•".repeat(take));
    remaining -= take;
  }

  return groups.join(" ") + " " + visible;
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
  const [universityYear, setUniversityYear] = useState<MemberProfile["universityYear"] | "">(
    member?.universityYear ?? "",
  );

  /* Investment Profile */
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | "">(
    member?.experienceLevel ?? "",
  );
  const [areasOfInterest, setAreasOfInterest] = useState<string[]>(member?.areasOfInterest ?? []);
  const [linkedinHandle, setLinkedinHandle] = useState(member?.linkedinHandle ?? "");
  const [caseCompetitionInterest, setCaseCompetitionInterest] = useState(
    member?.caseCompetitionInterest ?? false,
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
    setUniversityYear(member?.universityYear ?? "");
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

    const { firstName, lastName } = splitName(name);

    setSaving(true);
    setError(null);
    try {
      const response = await fetch("/api/accounts/personal-details", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          studentId: studentId.trim(),
          degrees: degrees.trim(),
          universityYear,
          phoneNumber: phoneNumber.trim(),
        }),
      });
      if (!response.ok) throw new Error("Failed to update details");
      setIsEditingDetails(false);
      router.refresh();
    } catch (err) {
      console.error("Failed to save details:", err);
      setError("Couldn't save your details. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const toggleInterest = (interest: string) => {
    setAreasOfInterest((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest],
    );
  };

  const handleCancelProfileEdit = () => {
    setExperienceLevel(member?.experienceLevel ?? "");
    setAreasOfInterest(member?.areasOfInterest ?? []);
    setLinkedinHandle(member?.linkedinHandle ?? "");
    setCaseCompetitionInterest(member?.caseCompetitionInterest ?? false);
    setProfileError(null);
    setIsEditingProfile(false);
  };

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    setProfileError(null);
    try {
      const res = await fetch("/api/accounts/investment-profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experienceLevel,
          areasOfInterest,
          linkedinHandle: linkedinHandle.trim(),
          caseCompetitionInterest,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to update profile");
      }
      setIsEditingProfile(false);
      router.refresh();
    } catch (err) {
      console.error("Failed to save profile:", err);
      setProfileError(err instanceof Error ? err.message : "Couldn't save. Try again.");
    } finally {
      setSavingProfile(false);
    }
  };

  const personalDetails = [
    {
      label: "Full Name",
      value: isEditingDetails ? (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex w-full items-center gap-2 rounded-[8px] border border-[#005EAF] px-2 py-2 text-sm"
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
          className="flex w-full items-center gap-2 rounded-[8px] border border-[#005EAF] px-2 py-2 text-sm"
        />
      ) : (
        maskStudentID(member?.studentId ?? "")
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
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full rounded-[8px] border border-[#005EAF] px-2 py-2 text-sm"
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
          className="w-full rounded-[8px] border border-[#005EAF] px-2 py-2 text-sm"
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
          onChange={(e) =>
            setUniversityYear(e.target.value as MemberProfile["universityYear"] | "")
          }
          className="w-full appearance-none rounded-[8px] border border-[#005EAF] px-2 py-2 text-sm"
        >
          <option value=""></option>
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
        <div className="text-sm font-bold tracking-wide text-blue-500 uppercase">
          Membership Dashboard
        </div>
        <h1 className="text-header text-darkBlue mt-1 font-bold">
          Welcome Back, {member?.firstName || "Member"}
        </h1>
        <div className="text-body mt-2 max-w-2xl text-slate-500">
          Manage your details, track your event RSVPs, and tell us what kind of investing content
          you want more of.
        </div>

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
                  <div className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                    {field.label}
                  </div>
                  <div className="text-darkBlue mt-1">{field.value}</div>
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
            <div className="flex justify-between rounded-2xl bg-gradient-to-r from-[#249AFF] to-[#005EAF] p-5 text-white">
              <div className="flex-col">
                <div className="text-m text-xl font-bold">
                  {member?.hasPaid ? "General Member" : "Membership Pending"}
                  {!member && (
                    <p className="mt-1 text-sm text-blue-100">No membership on file yet</p>
                  )}
                </div>
                <div className="text-s">{member?.hasPaid ? "Valid until" : ""}</div>
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
            <div className="flex w-full pt-7">
              <div className="w-1/2 flex-col">
                <div className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                  Member Since
                </div>
                <p className="text-darkBlue mt-1">{formatMemberSince(member?.paymentDate)}</p>
              </div>
              <div className="w-1/2 flex-col">
                <div className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                  Chapter
                </div>
                <p className="text-darkBlue mt-1">Auckland CBD</p>
              </div>
            </div>
            <hr className="mt-6 mb-4 border-t border-[#E2E9F2]" />
            <div className="pb-4">
              <Link href="/">
                {" "}
                {/* empty link ?*/}
                <button className="inline-flex items-center gap-2 rounded-4xl bg-[#EAF3FF] px-4 py-3 text-[1vw] font-semibold text-[#005EAF]">
                  Upgrade to Executive
                  <FiExternalLink size={14} />
                </button>
              </Link>
            </div>
          </Card>

          {/* Investment profile */}
          <Card className="lg:col-span-2">
            <CardHeader
              title="Investment profile"
              subtitle="Helps us match you to events, mentors and case teams"
              onEdit={() => setIsEditingProfile(true)}
            />

            <div className="text-xs font-medium tracking-wide text-slate-500 uppercase">
              Experience Level
            </div>
            <div className="mt-2 grid grid-cols-3 gap-3">
              {EXPERIENCE_LEVELS.map((level) => {
                const isSelected = isEditingProfile
                  ? experienceLevel === level.value
                  : member?.experienceLevel === level.value;
                return (
                  <button
                    key={level.value}
                    type="button"
                    disabled={!isEditingProfile}
                    onClick={() => setExperienceLevel(level.value)}
                    className={`rounded-lg border px-4 py-3 text-sm font-semibold transition-colors ${
                      isSelected
                        ? "border-[#005EAF] bg-blue-50 text-[#005EAF]"
                        : "border-transparent bg-slate-100 text-slate-600"
                    } ${isEditingProfile ? "hover:cursor-pointer" : "cursor-default"}`}
                  >
                    {level.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 text-xs font-medium tracking-wide text-slate-500 uppercase">
              Areas of Interest
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map((interest) => {
                const isSelected = isEditingProfile
                  ? areasOfInterest.includes(interest)
                  : (member?.areasOfInterest ?? []).includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    disabled={!isEditingProfile}
                    onClick={() => toggleInterest(interest)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      isSelected ? "bg-[#005EAF] text-white" : "bg-blue-50 text-[#005EAF]"
                    } ${isEditingProfile ? "hover:cursor-pointer" : "cursor-default"}`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <div>
                <div className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                  LinkedIn Handle
                </div>
                {isEditingProfile ? (
                  <input
                    value={linkedinHandle}
                    onChange={(e) => setLinkedinHandle(e.target.value)}
                    placeholder="in/yourname"
                    className="mt-1 w-full rounded-[8px] border border-[#005EAF] px-2 py-2 text-sm"
                  />
                ) : (
                  <p className="text-darkBlue mt-1">{member?.linkedinHandle || "—"}</p>
                )}
              </div>
              <div>
                <div className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                  Case Competition Interest
                </div>
                {isEditingProfile ? (
                  <select
                    value={caseCompetitionInterest ? "yes" : "no"}
                    onChange={(e) => setCaseCompetitionInterest(e.target.value === "yes")}
                    className="mt-1 w-full rounded-[8px] border border-[#005EAF] px-2 py-2 text-sm"
                  >
                    <option value="yes">Yes — notify me</option>
                    <option value="no">No thanks</option>
                  </select>
                ) : (
                  <p className="text-darkBlue mt-1">
                    {member?.caseCompetitionInterest ? "Yes — notify me" : "No thanks"}
                  </p>
                )}
              </div>
            </div>

            {profileError && <p className="mt-4 text-sm text-red-600">{profileError}</p>}

            {isEditingProfile && (
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={handleCancelProfileEdit}
                  disabled={savingProfile}
                  className="rounded-[8px] border-2 border-[#E2E9F2] px-5 py-2 text-sm font-medium text-slate-500 hover:cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={savingProfile}
                  className="rounded-[8px] bg-gradient-to-r from-[#249AFF] to-[#005EAF] px-5 py-2 text-sm font-semibold text-white hover:cursor-pointer disabled:opacity-50"
                >
                  {savingProfile ? "Saving..." : "Save Changes"}
                </button>
              </div>
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
