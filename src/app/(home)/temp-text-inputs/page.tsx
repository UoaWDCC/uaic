"use client";
// TEMP - review page for #427 TextInput / TextArea at /temp-text-inputs.
// Kept in the PR so reviewers can check it - delete once the PR is approved.
import { useState } from "react";
import { TextInput, TextArea } from "@/components/TextInput";

const NAME_ERROR = "Please enter your full name";
const NOTES_ERROR = "Please tell us a bit more";

export default function TempTextInputsPage() {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  // Errors start shown so the state is visible on load; typing clears them,
  // "Validate" re-checks - same pattern as /temp-primitives (#469)
  const [errName, setErrName] = useState("");
  const [errNotes, setErrNotes] = useState("");
  const [nameError, setNameError] = useState(NAME_ERROR);
  const [notesError, setNotesError] = useState(NOTES_ERROR);
  const [formName, setFormName] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [longValue, setLongValue] = useState(
    "Maximilian Alexander Fitzgerald-Worthington the Third of Upper Hutt, Wellington, Aotearoa New Zealand",
  );

  const validate = () => {
    setNameError(errName.trim() ? "" : NAME_ERROR);
    setNotesError(errNotes.trim() ? "" : NOTES_ERROR);
  };

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-12 px-4 py-12">
      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-bold">Default</h2>
        <TextInput
          label="Full name"
          required
          placeholder="Enter your full name"
          value={name}
          onChange={setName}
          autoComplete="name"
        />
        <TextArea
          label="Anything else we should know?"
          placeholder="Accessibility needs, questions, etc."
          value={notes}
          onChange={setNotes}
        />
        <pre className="text-sm whitespace-pre-wrap">{JSON.stringify({ name, notes })}</pre>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-bold">Error state</h2>
        <TextInput
          label="Full name"
          required
          placeholder="Enter your full name"
          value={errName}
          onChange={(v) => {
            setErrName(v);
            setNameError("");
          }}
          error={nameError}
        />
        <TextArea
          label="Anything else we should know?"
          required
          placeholder="Accessibility needs, questions, etc."
          value={errNotes}
          onChange={(v) => {
            setErrNotes(v);
            setNotesError("");
          }}
          error={notesError}
        />
        <button type="button" onClick={validate} className="self-start rounded border px-4 py-2">
          Validate
        </button>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-bold">Required - native validation</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(formName);
          }}
          className="flex flex-col gap-4"
        >
          <TextInput
            label="Full name"
            name="fullName"
            required
            placeholder="Leave empty and submit"
            value={formName}
            onChange={setFormName}
          />
          <button type="submit" className="self-start rounded border px-4 py-2">
            Submit
          </button>
        </form>
        <p className="text-sm">
          Submitted: <code>{submitted ?? "-"}</code>
        </p>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-bold">Can&apos;t edit (grey)</h2>
        <TextInput
          label="Disabled, empty"
          placeholder="Enter your full name"
          value=""
          onChange={() => {}}
          disabled
        />
        <TextInput
          label="Disabled, filled"
          required
          value="Jane Doe"
          onChange={() => {}}
          disabled
        />
        <TextInput
          label="Read-only (focusable + copyable, still submitted)"
          value="jane.doe@aucklanduni.ac.nz"
          onChange={() => {}}
          readOnly
        />
        <TextArea
          label="Disabled textarea"
          value="This can't be edited."
          onChange={() => {}}
          disabled
        />
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-bold">Content edge cases</h2>
        <TextInput
          label="Long value - move the caret through it to see the edge fades"
          value={longValue}
          onChange={setLongValue}
        />
        <TextInput
          label="A really long label that should wrap onto a second line on a narrow mobile screen"
          required
          value=""
          onChange={() => {}}
          placeholder="Placeholder"
        />
        <TextArea
          label="Custom rows={2}"
          placeholder="Shorter textarea"
          rows={2}
          value=""
          onChange={() => {}}
        />
        <div className="w-[300px]">
          <TextArea
            label="Narrow (300px)"
            placeholder="Should still fit"
            value=""
            onChange={() => {}}
          />
        </div>
      </section>
    </div>
  );
}
