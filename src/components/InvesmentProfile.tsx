"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEdit2 } from "react-icons/fi";
import type { MemberProfile } from "./MembershipDashboard";

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

interface InvestmentProfileProps {
  member: MemberProfile | null;
}

const InvestmentProfile = ({ member }: InvestmentProfileProps) => {
  const router = useRouter();
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

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-darkBlue text-xl font-bold">Investment profile</p>
          <p className="mt-1 text-sm text-slate-500">
            Helps us match you to events, mentors and case teams
          </p>
        </div>
        <button
          onClick={() => setIsEditingProfile(true)}
          className="bg-lightBlue grid h-9 w-9 shrink-0 place-items-center rounded-full text-blue-600 hover:cursor-pointer"
        >
          <FiEdit2 size={16} />
        </button>
      </div>

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
    </div>
  );
};

export default InvestmentProfile;
