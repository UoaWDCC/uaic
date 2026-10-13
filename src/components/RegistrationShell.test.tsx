// Colocated with the component it covers - checks the Complete Registration
// button submits the form, and the form-less mode used for closed events.
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import RegistrationShell from "./RegistrationShell";

describe("RegistrationShell", () => {
  it("renders the title, header and fields inside the form", () => {
    render(
      <RegistrationShell header={<p>Networking Night</p>} onSubmit={() => {}}>
        <input aria-label="Full name" />
      </RegistrationShell>,
    );

    expect(screen.getByRole("heading", { level: 1, name: "Event Sign Up" })).toBeInTheDocument();
    expect(screen.getByText("Networking Night")).toBeInTheDocument();
    expect(screen.getByRole("form", { name: "Event Sign Up" })).toContainElement(
      screen.getByRole("textbox", { name: "Full name" }),
    );
  });

  it("submits the form from the Complete Registration button", () => {
    const onSubmit = vi.fn();
    render(<RegistrationShell onSubmit={onSubmit} />);

    fireEvent.click(screen.getByRole("button", { name: "Complete Registration" }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    // The page shouldn't do a native full-page form post.
    expect(onSubmit.mock.calls[0][0].defaultPrevented).toBe(true);
  });

  it("runs native validation before calling onSubmit", () => {
    const onSubmit = vi.fn();
    render(
      <RegistrationShell onSubmit={onSubmit}>
        <input aria-label="Full name" required />
      </RegistrationShell>,
    );
    const button = screen.getByRole("button", { name: "Complete Registration" });

    fireEvent.click(button);
    expect(onSubmit).not.toHaveBeenCalled();

    fireEvent.change(screen.getByRole("textbox", { name: "Full name" }), {
      target: { value: "Alex Smith" },
    });
    fireEvent.click(button);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("uses custom title and submit labels", () => {
    render(<RegistrationShell title="Edit Registration" submitLabel="Save" onSubmit={() => {}} />);

    expect(screen.getByRole("heading", { name: "Edit Registration" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("renders a custom action in place of the default button", () => {
    render(
      <RegistrationShell
        action={<button type="submit">Pay & Register</button>}
        onSubmit={() => {}}
      />,
    );

    expect(screen.getByRole("button", { name: "Pay & Register" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Complete Registration" })).not.toBeInTheDocument();
  });

  it("renders without a form or submit button when there's no onSubmit", () => {
    render(
      <RegistrationShell>
        <p>Event full</p>
      </RegistrationShell>,
    );

    expect(screen.getByText("Event full")).toBeInTheDocument();
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Complete Registration" })).not.toBeInTheDocument();
  });
});
