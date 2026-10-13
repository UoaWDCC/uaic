"use client";
// TEMP - review page for #426 RadioGroup / CheckboxGroup at /temp-primitives.
// Kept in the PR so reviewers can check it - delete once the PR is approved.
import { useState } from "react";
import RadioGroup from "@/components/RadioGroup";
import CheckboxGroup from "@/components/CheckboxGroup";

const dietary = [
  { label: "None", value: "none" },
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Vegan", value: "vegan" },
  { label: "Gluten-free", value: "gluten-free" },
  { label: "Other", value: "other" },
];

const activities = [
  { label: "Trading game", value: "trading" },
  { label: "Networking", value: "networking" },
  { label: "Workshop", value: "workshop" },
];

export default function TempPrimitivesPage() {
  const [diet, setDiet] = useState("");
  const [dietOther, setDietOther] = useState("");
  const [acts, setActs] = useState<string[]>([]);
  const [dietErr, setDietErr] = useState("");
  const [actsErr, setActsErr] = useState<string[]>([]);
  const [actsPartial, setActsPartial] = useState<string[]>(["trading"]);
  // Errors start shown so the state is visible on load; picking an option clears them,
  // "Validate" re-checks - the pattern a real form should follow
  const [dietError, setDietError] = useState("Please select an option");
  const [actsError, setActsError] = useState("Please select at least one activity");

  const validate = () => {
    setDietError(dietErr ? "" : "Please select an option");
    setActsError(actsErr.length ? "" : "Please select at least one activity");
  };

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-12 px-4 py-12">
      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-bold">Default</h2>
        <RadioGroup
          name="dietary"
          label="Dietary requirements"
          required
          options={dietary}
          value={diet}
          onChange={setDiet}
          otherValue="other"
          otherText={dietOther}
          onOtherTextChange={setDietOther}
        />
        <CheckboxGroup
          label="Activities you'd like to join"
          options={activities}
          value={acts}
          onChange={setActs}
        />
        <pre className="text-sm">{JSON.stringify({ diet, dietOther, acts })}</pre>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-bold">Error state</h2>
        <RadioGroup
          name="dietary-error"
          label="Dietary requirements"
          required
          options={dietary}
          value={dietErr}
          onChange={(v) => {
            setDietErr(v);
            setDietError("");
          }}
          error={dietError}
        />
        <CheckboxGroup
          label="Activities you'd like to join"
          required
          options={activities}
          value={actsErr}
          onChange={(v) => {
            setActsErr(v);
            if (v.length) setActsError("");
          }}
          error={actsError}
        />
        <button type="button" onClick={validate} className="self-start rounded border px-4 py-2">
          Validate
        </button>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-bold">Disabled</h2>
        <RadioGroup
          name="dietary-disabled"
          label="Whole group disabled"
          required
          options={dietary}
          value="other"
          onChange={() => {}}
          otherValue="other"
          otherText="Halal"
          disabled
        />
        <CheckboxGroup
          label="One option disabled (Workshop is full)"
          options={activities.map((o) => (o.value === "workshop" ? { ...o, disabled: true } : o))}
          value={actsPartial}
          onChange={setActsPartial}
        />
      </section>
    </div>
  );
}
