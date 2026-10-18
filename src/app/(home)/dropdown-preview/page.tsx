"use client";

// TEMP - review page for #452 Dropdown states at /dropdown-preview.
// Kept in the PR so reviewers can check it - delete once the PR is approved.

import { useRef, useState } from "react";
import Dropdown from "@/components/Dropdown";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const universities = [
  "University of Auckland",
  "Auckland University of Technology",
  "Massey University",
  "University of Waikato",
  "Victoria University of Wellington",
  "University of Canterbury",
  "Lincoln University",
  "University of Otago",
  "Unitec",
  "Manukau Institute of Technology",
  "Wintec",
  "Ara Institute of Canterbury",
  "Otago Polytechnic",
  "Eastern Institute of Technology",
  "Toi Ohomai",
  "NorthTec",
  "Whitireia",
  "Southern Institute of Technology",
  "Nelson Marlborough Institute of Technology",
  "Other",
];
const longOptions = [
  "Vegetarian, but I also eat fish on weekends and avoid all dairy products",
  "Short",
];

function Demo({
  label,
  initial = "",
  ...props
}: Omit<React.ComponentProps<typeof Dropdown>, "value" | "onChange" | "ariaLabel"> & {
  label: string;
  initial?: string;
}) {
  const [value, setValue] = useState(initial);
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-gray-500">
        {label} - value: <code>{value || "(empty)"}</code>
      </p>
      <Dropdown {...props} value={value} onChange={setValue} ariaLabel={label} />
    </div>
  );
}

export default function DropdownPreview() {
  const formRef = useRef<HTMLFormElement>(null);
  const [size, setSize] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  // Error starts shown so the state is visible on load; picking an option clears it,
  // "Validate" re-checks - same pattern as /temp-primitives (#469)
  const [errValue, setErrValue] = useState("");
  const [error, setError] = useState("Please select a size");

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-12 px-4 py-12">
      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-bold">Default</h2>
        <Demo label="1. Optional, empty (has None)" options={sizes} placeholder="Select a size" />
        <Demo label="2. Pre-filled" options={sizes} initial="M" placeholder="Select a size" />
        <Demo label="4. No placeholder (fallback text)" options={sizes} />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-bold">3. Required - native validation</h2>
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(size);
          }}
          className="flex flex-col gap-3"
        >
          <Dropdown
            required
            options={sizes}
            value={size}
            onChange={setSize}
            ariaLabel="T-shirt size"
            placeholder="Select a size"
          />
          <div className="flex gap-2">
            <button type="submit" className="rounded border px-3 py-1">
              Submit
            </button>
            <button
              type="button"
              className="rounded border px-3 py-1"
              onClick={() => formRef.current?.reportValidity()}
            >
              Validate
            </button>
            <button
              type="button"
              className="rounded border px-3 py-1"
              onClick={() => {
                setSize("");
                setSubmitted(null);
              }}
            >
              Reset
            </button>
          </div>
        </form>
        <p className="text-sm">
          Value: <code>{size || "(empty)"}</code> - Submitted: <code>{submitted ?? "-"}</code>
        </p>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-bold">Error state</h2>
        <Dropdown
          required
          options={sizes}
          value={errValue}
          onChange={(v) => {
            setErrValue(v);
            setError("");
          }}
          ariaLabel="T-shirt size (error)"
          placeholder="Select a size"
          error={error}
        />
        <button
          type="button"
          onClick={() => setError(errValue ? "" : "Please select a size")}
          className="self-start rounded border px-4 py-2"
        >
          Validate
        </button>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-bold">Disabled</h2>
        <Demo label="Disabled, empty" options={sizes} placeholder="Select a size" disabled />
        <Demo label="Disabled, pre-filled" options={sizes} initial="L" disabled />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-bold">Content edge cases</h2>
        <Demo
          label="5. Long list (scrolls)"
          options={universities}
          placeholder="Select a university"
        />
        <Demo
          label="6. Long value / option text"
          options={longOptions}
          initial={longOptions[0]}
          placeholder="Dietary requirements"
        />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-bold">Layout</h2>
        <p className="text-sm text-gray-500">
          7. Stacked - open the first one; its panel should sit over the second
        </p>
        <div className="flex flex-col gap-3">
          <Demo label="Stacked A" options={universities} placeholder="Select a university" />
          <Demo label="Stacked B" options={sizes} placeholder="Select a size" />
        </div>
        <div className="w-[300px]">
          <Demo
            label="8. Narrow (300px)"
            options={longOptions}
            placeholder="Dietary requirements"
          />
        </div>
      </section>
    </div>
  );
}
