import { createContext, StrictMode, useContext, useMemo, useReducer } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { FormState } from "payload";
import { reduceFieldsToValues } from "payload/shared";
import type { Event } from "../../../../payload-types";
// Exercise the installed Payload reducer: inserting a block must update nested
// field state as well as row metadata and preserve existing custom questions.
import { fieldReducer } from "../../../../node_modules/@payloadcms/ui/dist/forms/Form/fieldReducer.js";
import { InitialiseEventSignupForm } from "./InitialiseEventSignupForm";

type SignupSettings = Pick<Partial<Event>, "requiresSignup" | "signupForm">;
type AddRow = { blockType: string; path: string; rowIndex: number; subFieldState: FormState };
const TestContext = createContext<{
  fields: FormState;
  savedData?: SignupSettings;
  form: { addFieldRow: (args: AddRow) => void; getDataByPath: (path: string) => unknown };
}>(null!);

vi.mock("@payloadcms/ui", () => ({
  useDocumentInfo: () => ({ data: useContext(TestContext).savedData }),
  useForm: () => useContext(TestContext).form,
  useFormFields: (selector: (state: [FormState]) => unknown) =>
    selector([useContext(TestContext).fields]),
}));

afterEach(cleanup);

const question = {
  blockType: "formField",
  label: "Dietary requirements",
  fieldType: "shortText",
} as const;
const detailNames = [
  "firstName",
  "lastName",
  "email",
  "upi",
  "studentId",
  "universityYear",
  "degrees",
  "majors",
];

function AdminForm({
  savedData,
  initial = {},
}: {
  savedData?: SignupSettings;
  initial?: SignupSettings;
}) {
  const [fields, dispatch] = useReducer(fieldReducer, initial, (data) => {
    let state: FormState = {
      requiresSignup: { value: data.requiresSignup ?? false, valid: true },
      signupForm: { value: 0, rows: [], valid: true, disableFormData: true },
    };
    for (const block of data.signupForm ?? []) {
      state = fieldReducer(state, {
        type: "ADD_ROW",
        path: "signupForm",
        blockType: block.blockType,
        subFieldState: Object.fromEntries(
          Object.entries(block).map(([key, value]) => [key, { value, valid: true }]),
        ),
      });
    }
    return state;
  });
  const form = useMemo(
    () => ({
      addFieldRow: (args: AddRow) => dispatch({ type: "ADD_ROW", ...args }),
      getDataByPath: (path: string) => reduceFieldsToValues(fields, true)[path],
    }),
    [fields],
  );
  const data = reduceFieldsToValues(fields, true) as SignupSettings;
  return (
    <TestContext.Provider value={{ fields, savedData, form }}>
      <button
        onClick={() =>
          dispatch({ type: "UPDATE", path: "requiresSignup", value: !data.requiresSignup })
        }
      >
        Toggle signup
      </button>
      <button onClick={() => dispatch({ type: "REMOVE_ROW", path: "signupForm", rowIndex: 3 })}>
        Remove UPI
      </button>
      <InitialiseEventSignupForm />
      <output data-testid="form-data">{JSON.stringify(data)}</output>
    </TestContext.Provider>
  );
}

const readForm = () => JSON.parse(screen.getByTestId("form-data").textContent!) as SignupSettings;
const details = () =>
  readForm().signupForm?.map((block) =>
    block.blockType === "memberDetail" ? block.detail : block.label,
  );

describe("immediate admin signup form initialisation", () => {
  it("inserts eight real block rows before custom questions on the first toggle", () => {
    render(
      <StrictMode>
        <AdminForm initial={{ signupForm: [question] }} />
      </StrictMode>,
    );
    expect(details()).toEqual([question.label]);
    fireEvent.click(screen.getByText("Toggle signup"));
    expect(details()).toEqual([...detailNames, question.label]);
  });

  it("preserves removed optional details when toggling off and back on before saving", () => {
    render(<AdminForm />);
    fireEvent.click(screen.getByText("Toggle signup"));
    fireEvent.click(screen.getByText("Remove UPI"));
    fireEvent.click(screen.getByText("Toggle signup"));
    fireEvent.click(screen.getByText("Toggle signup"));
    expect(details()).toEqual(detailNames.filter((detail) => detail !== "upi"));
  });

  it("preserves an already configured subset when enabling signup", () => {
    render(
      <AdminForm
        initial={{ signupForm: [{ blockType: "memberDetail", detail: "email" }, question] }}
      />,
    );
    fireEvent.click(screen.getByText("Toggle signup"));
    expect(details()).toEqual(["email", question.label]);
  });

  it("does not initialise an already-enabled legacy form on mount or toggling", () => {
    const legacy = { requiresSignup: true, signupForm: [question] };
    render(<AdminForm initial={legacy} savedData={legacy} />);
    expect(details()).toEqual([question.label]);
    fireEvent.click(screen.getByText("Toggle signup"));
    fireEvent.click(screen.getByText("Toggle signup"));
    expect(details()).toEqual([question.label]);
  });

  it("initialises an unsaved event that already has signup selected exactly once", () => {
    render(
      <StrictMode>
        <AdminForm initial={{ requiresSignup: true }} />
      </StrictMode>,
    );
    expect(details()).toEqual(detailNames);
  });
});
