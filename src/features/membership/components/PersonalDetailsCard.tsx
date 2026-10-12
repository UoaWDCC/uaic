"use client";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { maskPhoneNumber } from "../utils/maskPhoneNumber";
import { maskStudentID } from "../utils/maskStudentID";
import { MemberProfile, SessionUser } from "../types";
import SaveButton from "./SaveButton";
import CancelButton from "./CancelButton";
import { savePersonalDetails } from "../data/savePersonalDetails";
import { GoArrowUpRight } from "react-icons/go";
import {
  MAX_DEGREE_LENGTH,
  MAX_NAME_LENGTH,
  validatePersonalDetails,
  type PersonalDetailsErrors,
} from "../utils/validatePersonalDetails";

const YEAR_LABELS: Record<NonNullable<MemberProfile["universityYear"]>, string> = {
  year1: "1st Year",
  year2: "2nd Year",
  year3: "3rd Year",
  year4: "4th Year",
  year5Plus: "5th Year+",
  postgraduate: "Postgraduate",
};

const inputClassName =
  "border-input focus:border-ring flex w-full items-center gap-2 rounded-full border px-4 py-2 text-sm focus:outline-none";

interface PersonalDetailsCardProps {
  user: SessionUser;
  member: MemberProfile | null;
  onSaved: () => void;
}

const PersonalDetailsCard = ({ user, member, onSaved }: PersonalDetailsCardProps) => {
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<PersonalDetailsErrors>({});

  const [name, setName] = useState(`${member?.firstName ?? ""} ${member?.lastName ?? ""}`.trim());
  const [studentId, setStudentId] = useState(member?.studentId ?? "");
  const [phoneNumber, setPhoneNumber] = useState(member?.phoneNumber ?? "");
  const [degrees, setDegrees] = useState(member?.degrees ?? "");
  const [universityYear, setUniversityYear] = useState<MemberProfile["universityYear"]>(
    member?.universityYear ?? null,
  );

  const [isYearOpen, setIsYearOpen] = useState(false);

  /* Resets the input fields */
  const handleCancelEdit = () => {
    setName(`${member?.firstName ?? ""} ${member?.lastName ?? ""}`.trim());
    setStudentId(member?.studentId ?? "");
    setPhoneNumber(member?.phoneNumber ?? "");
    setDegrees(member?.degrees ?? "");
    setUniversityYear(member?.universityYear ?? null);
    setError(null);
    setFieldErrors({});
    setIsEditingDetails(false);
  };

  /* splits users full name from input field to fit into first and last name field */
  const splitName = (fullName: string) => {
    const [first, ...rest] = fullName.trim().split(/\s+/);
    return { firstName: first ?? "", lastName: rest.join(" ") };
  };

  const handleSaveDetails = async () => {
    const { firstName, lastName } = splitName(name);
    const details = {
      firstName,
      lastName,
      studentId: studentId.trim(),
      degrees: degrees.trim(),
      universityYear,
      phoneNumber: phoneNumber.trim(),
    };

    const errors = validatePersonalDetails(details);
    /* lastName is required in Member.ts, so a single-word name can't be saved */
    if (firstName && !lastName) errors.lastName = "Please enter your first and last name.";
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setError(null);
      return;
    }

    setSaving(true);
    setError(null);
    try {
      await savePersonalDetails(details);
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
      error: fieldErrors.firstName || fieldErrors.lastName,
      value: isEditingDetails ? (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClassName}
          autoComplete="name"
          maxLength={MAX_NAME_LENGTH * 2 + 1}
          aria-invalid={!!(fieldErrors.firstName || fieldErrors.lastName)}
          autoFocus
        />
      ) : (
        `${member?.firstName ?? ""} ${member?.lastName ?? ""}`.trim() || "—"
      ),
    },
    {
      label: "Student ID",
      error: fieldErrors.studentId,
      value: isEditingDetails ? (
        <input
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className={inputClassName}
          inputMode="numeric"
          maxLength={10}
          aria-invalid={!!fieldErrors.studentId}
        />
      ) : (
        maskStudentID(member?.studentId ?? "")
      ),
    },
    {
      label: "University Email",
      value: user.email,
    },
    {
      label: "Phone Number",
      error: fieldErrors.phoneNumber,
      value: isEditingDetails ? (
        <input
          type="tel"
          inputMode="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={inputClassName}
          autoComplete="tel"
          maxLength={20}
          aria-invalid={!!fieldErrors.phoneNumber}
        />
      ) : (
        maskPhoneNumber(member?.phoneNumber ?? "")
      ),
    },
    {
      label: "Degree / Programme",
      error: fieldErrors.degrees,
      value: isEditingDetails ? (
        <input
          value={degrees}
          onChange={(e) => setDegrees(e.target.value)}
          className={inputClassName}
          maxLength={MAX_DEGREE_LENGTH}
          aria-invalid={!!fieldErrors.degrees}
        />
      ) : (
        member?.degrees || "—"
      ),
    },
    {
      label: "Year of Study",
      error: fieldErrors.universityYear,
      value: isEditingDetails ? (
        <div className="group relative w-full">
          <select
            value={universityYear ?? ""}
            onFocus={() => setIsYearOpen(true)}
            onBlur={() => setIsYearOpen(false)}
            onChange={(e) =>
              setUniversityYear(
                e.target.value === "" ? null : (e.target.value as MemberProfile["universityYear"]),
              )
            }
            className={`${inputClassName} appearance-none`}
          >
            <option value="">Select year</option>
            {Object.entries(YEAR_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <GoArrowUpRight
            size={16}
            className={`pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-blue-900 transition-transform duration-200 ${
              isYearOpen ? "rotate-45" : ""
            }`}
          />
        </div>
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
            aria-label="Edit personal details"
            className="bg-surface-faint grid h-9 w-9 shrink-0 place-items-center rounded-full text-blue-600 hover:cursor-pointer focus:border-blue-500 focus:outline-none"
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
            <div className="text-ink mt-1 text-sm">{field.value}</div>
            {isEditingDetails && "error" in field && field.error && (
              <p className="mt-1 text-xs text-red-600">{field.error}</p>
            )}
          </div>
        ))}
      </div>

      <hr className="border-border mt-5 mb-4 border-t" />
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <div className="flex items-center justify-between gap-1">
        <a className="border-blue-900 text-xs font-semibold text-blue-900 hover:cursor-pointer hover:underline md:text-sm">
          Change Password
        </a>

        {isEditingDetails && (
          <div className="flex items-center gap-1 md:gap-3">
            <CancelButton onClick={handleCancelEdit} disabled={saving} />
            <SaveButton onClick={handleSaveDetails} saving={saving} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalDetailsCard;
