"use client";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { maskPhoneNumber } from "../utils/maskPhoneNumber";
import { maskStudentID } from "../utils/maskStudentID";
import { MemberProfile, SessionUser } from "../types";
import SaveButton from "./SaveButton";
import CancelButton from "./CancelButton";
import { savePersonalDetails } from "../data/savePersonalDetails";

const YEAR_LABELS: Record<NonNullable<MemberProfile["universityYear"]>, string> = {
  year1: "1st Year",
  year2: "2nd Year",
  year3: "3rd Year",
  year4: "4th Year",
  year5Plus: "5th Year+",
  postgraduate: "Postgraduate",
};

interface PersonalDetailsCardProps {
  user: SessionUser;
  member: MemberProfile | null;
  onSaved: () => void;
}

const PersonalDetailsCard = ({ user, member, onSaved }: PersonalDetailsCardProps) => {
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(`${member?.firstName ?? ""} ${member?.lastName ?? ""}`.trim());
  const [email, setEmail] = useState(user.email);
  const [studentId, setStudentId] = useState(member?.studentId ?? "");
  const [phoneNumber, setPhoneNumber] = useState(member?.phoneNumber ?? "");
  const [degrees, setDegrees] = useState(member?.degrees ?? "");
  const [universityYear, setUniversityYear] = useState<MemberProfile["universityYear"]>(
    member?.universityYear ?? null,
  );

  /* Checks if the email has a valid abc@xyz format with only one '@' */
  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  /* Resets the input fields */
  const handleCancelEdit = () => {
    setName(`${member?.firstName ?? ""} ${member?.lastName ?? ""}`.trim());
    setStudentId(member?.studentId ?? "");
    setPhoneNumber(member?.phoneNumber ?? "");
    setDegrees(member?.degrees ?? "");
    setUniversityYear(member?.universityYear ?? null);
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
      onSaved();
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
          className="border-ink flex w-full items-center gap-2 rounded-lg border px-2 py-2 text-sm"
          autoComplete="name"
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
          className="border-ink flex w-full items-center gap-2 rounded-lg border px-2 py-2 text-sm"
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
          className="border-ink flex w-full items-center gap-2 rounded-lg border px-2 py-2 text-sm"
          autoComplete="email"
        />
      ) : (
        user.email
      ),
    },
    {
      label: "Phone Number",
      value: isEditingDetails ? (
        <input
          type="tel"
          inputMode="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border-ink flex w-full items-center gap-2 rounded-lg border px-2 py-2 text-sm"
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
          className="border-ink flex w-full items-center gap-2 rounded-lg border px-2 py-2 text-sm"
        />
      ) : (
        member?.degrees || "—"
      ),
    },
    {
      label: "Year of Study",
      value: isEditingDetails ? (
        <select
          value={universityYear ?? ""}
          onChange={(e) =>
            setUniversityYear(
              e.target.value === "" ? null : (e.target.value as MemberProfile["universityYear"]),
            )
          }
          className="border-ink flex w-full items-center gap-2 rounded-lg border px-2 py-2 text-sm"
        >
          <option value="">Select year</option>
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
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-ink text-xl font-bold">Personal details</p>
          <p className="mt-1 text-sm text-slate-500">Visible to club admin only</p>
        </div>
        {!isEditingDetails && (
          <button
            onClick={() => setIsEditingDetails(true)}
            className="bg-surface-faint grid h-9 w-9 shrink-0 place-items-center rounded-full text-blue-600 hover:cursor-pointer"
          >
            <FiEdit2 size={16} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        {personalDetails.map((field) => (
          <div key={field.label}>
            <div className="text-sm font-medium tracking-wide text-slate-500 uppercase">
              {field.label}
            </div>
            <p className="text-ink mt-1 text-sm">{field.value}</p>
          </div>
        ))}
      </div>

      <hr className="mt-5 mb-4 border-t border-[#E2E9F2]" />
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <div className="flex justify-between">
        <a className="border-blue-900 text-sm font-semibold text-blue-900 hover:cursor-pointer hover:underline">
          Change Password
        </a>

        {isEditingDetails && (
          <div className="flex items-center gap-3">
            <CancelButton onClick={handleCancelEdit} disabled={saving} />
            <SaveButton onClick={handleSaveDetails} saving={saving} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalDetailsCard;
