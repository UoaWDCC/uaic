"use client";

import { useState } from "react";
import { GoCheck } from "react-icons/go";
import RegistrationShell from "@/components/RegistrationShell";

// Temporary fixtures for #430. Field primitives and the event header belong to
// #426/#427/#429; fetching event configuration and saving responses belong to #212.
const inputClassName =
  "h-[52px] w-full rounded-[40px] border-[0.5px] border-border bg-white px-4 py-2 text-base placeholder:text-[#6B7A8D] focus:border-primary-light focus:outline-none";
const choiceClassName =
  "flex min-h-[52px] cursor-pointer items-center gap-3 rounded-[40px] border-[0.5px] border-border bg-white px-4 py-2 focus-within:border-primary-light has-checked:border-primary-light has-checked:bg-surface-faint";

export default function RegistrationPreview() {
  const [diet, setDiet] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <RegistrationShell
      header={
        <div className="flex items-center gap-4">
          <div
            className="bg-surface-faint text-primary flex h-[52px] w-[52px] shrink-0 flex-col items-center justify-center rounded-lg leading-none font-bold"
            aria-label="14 August"
          >
            <span className="text-xl">14</span>
            <span>AUG</span>
          </div>
          <div className="min-w-0">
            <h2 className="text-base leading-tight font-semibold">Networking: People in Finance</h2>
            <p className="text-muted-foreground text-base">5:30 PM · OGGB Atrium</p>
          </div>
        </div>
      }
      onSubmit={() => setSubmitted(true)}
    >
      <div className="flex flex-col gap-3">
        <label htmlFor="preview-full-name">
          Full name{" "}
          <span className="text-destructive" aria-hidden="true">
            *
          </span>
        </label>
        <input
          id="preview-full-name"
          name="fullName"
          autoComplete="name"
          required
          placeholder="e.g. Alex Smith"
          className={inputClassName}
        />
      </div>

      <fieldset className="min-w-0">
        <legend className="mb-3">
          Dietary requirements{" "}
          <span className="text-destructive" aria-hidden="true">
            *
          </span>
        </legend>
        <div className="flex flex-col gap-3">
          {["None", "Vegetarian", "Vegan", "Gluten-free", "Other"].map((option) => (
            <label key={option} className={choiceClassName}>
              <input
                type="radio"
                name="diet"
                value={option}
                required
                checked={diet === option}
                onChange={() => setDiet(option)}
                className="checked:border-primary-light checked:bg-primary-light h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-full border-2 border-[#B8C9DD] bg-white checked:shadow-[inset_0_0_0_3px_white] focus:outline-none"
              />
              {option}
            </label>
          ))}
          {diet === "Other" && (
            <input
              name="otherDiet"
              aria-label="Other dietary requirements"
              placeholder="Please describe your dietary requirements"
              className={inputClassName}
            />
          )}
        </div>
      </fieldset>

      <fieldset className="min-w-0">
        <legend className="mb-3">Activities you’d like to join</legend>
        <div className="flex flex-col gap-3">
          {["Volleyball", "Frisbee", "Lawn bowls", "Just chilling"].map((option) => (
            <label key={option} className={choiceClassName}>
              <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                <input
                  type="checkbox"
                  name="activities"
                  value={option}
                  className="peer checked:border-primary-light checked:bg-primary-light h-5 w-5 cursor-pointer appearance-none rounded-[5px] border-2 border-[#B8C9DD] bg-white focus:outline-none"
                />
                <GoCheck
                  aria-hidden="true"
                  stroke="currentColor"
                  strokeWidth={1}
                  strokeLinejoin="round"
                  className="pointer-events-none absolute h-4 w-4 text-white opacity-0 peer-checked:opacity-100"
                />
              </span>
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-3">
        <label htmlFor="preview-size">T-shirt size</label>
        {/* Temporary native control until the #428 Dropdown variant lands on this branch. */}
        <select id="preview-size" name="size" defaultValue="" className={inputClassName}>
          <option value="">Select a size</option>
          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="preview-notes">Anything else we should know?</label>
        <div className="border-border focus-within:border-primary-light rounded-lg border-[0.5px] bg-white p-3">
          <textarea
            id="preview-notes"
            name="notes"
            placeholder="Optional notes…"
            className="block min-h-[94px] w-full resize-y border-0 bg-transparent px-1 placeholder:text-[#6B7A8D] focus:outline-none"
          />
        </div>
      </div>
      {submitted && (
        <p role="status" className="text-primary">
          Preview submitted successfully. No registration was saved.
        </p>
      )}
    </RegistrationShell>
  );
}
