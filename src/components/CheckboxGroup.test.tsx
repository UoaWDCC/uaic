// Component tier: renders with Testing Library in jsdom.
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckboxGroup from "./CheckboxGroup";

const options = [
  { label: "Trading game", value: "trading" },
  { label: "Networking", value: "networking" },
  { label: "Workshop", value: "workshop" },
];

const renderGroup = (props: Partial<React.ComponentProps<typeof CheckboxGroup>> = {}) =>
  render(
    <CheckboxGroup
      label="Activities you'd like to join"
      options={options}
      value={[]}
      onChange={() => {}}
      {...props}
    />,
  );

describe("CheckboxGroup", () => {
  it("renders one checkbox per option, grouped under the label", () => {
    renderGroup();

    expect(
      screen.getByRole("group", { name: /activities you'd like to join/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("checkbox")).toHaveLength(options.length);
  });

  it("adds an unticked option to the existing value", () => {
    const onChange = vi.fn();
    renderGroup({ value: ["trading"], onChange });

    fireEvent.click(screen.getByLabelText("Workshop"));

    expect(onChange).toHaveBeenCalledWith(["trading", "workshop"]);
  });

  it("removes a ticked option from the value", () => {
    const onChange = vi.fn();
    renderGroup({ value: ["trading", "networking"], onChange });

    fireEvent.click(screen.getByLabelText("Trading game"));

    expect(onChange).toHaveBeenCalledWith(["networking"]);
  });

  it("ticks every option in value", () => {
    renderGroup({ value: ["trading", "workshop"] });

    expect(screen.getByLabelText("Trading game")).toBeChecked();
    expect(screen.getByLabelText("Networking")).not.toBeChecked();
    expect(screen.getByLabelText("Workshop")).toBeChecked();
  });

  it("passes name through to every checkbox for native form submission", () => {
    renderGroup({ name: "activities" });

    screen
      .getAllByRole("checkbox")
      .forEach((box) => expect(box).toHaveAttribute("name", "activities"));
  });

  describe("required", () => {
    it("announces (required) and hides the asterisk from screen readers", () => {
      renderGroup({ required: true });

      expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
      expect(screen.getByRole("group")).toHaveAccessibleName(
        "Activities you'd like to join (required)",
      );
    });

    it("doesn't set native required - that would force every box to be ticked", () => {
      renderGroup({ required: true });

      screen.getAllByRole("checkbox").forEach((box) => expect(box).not.toBeRequired());
    });
  });

  describe("error", () => {
    it("marks each checkbox invalid and links the message", () => {
      renderGroup({ error: "Please select at least one activity" });

      screen.getAllByRole("checkbox").forEach((box) => {
        expect(box).toHaveAttribute("aria-invalid", "true");
        expect(box).toHaveAccessibleDescription("Please select at least one activity");
      });
    });

    it("has no invalid state without an error", () => {
      renderGroup();

      screen
        .getAllByRole("checkbox")
        .forEach((box) => expect(box).not.toHaveAttribute("aria-invalid"));
    });
  });

  describe("disabled", () => {
    it("disables every checkbox when the group is disabled", () => {
      // Only the disabled state is asserted - jsdom's fireEvent.click skips the
      // browser's disabled check and still toggles the input, so "clicks do
      // nothing" was verified manually on /temp-primitives instead
      renderGroup({ disabled: true });

      screen.getAllByRole("checkbox").forEach((box) => expect(box).toBeDisabled());
    });

    it("disables only the option marked disabled, leaving the rest usable", () => {
      const onChange = vi.fn();
      renderGroup({
        options: options.map((o) => (o.value === "workshop" ? { ...o, disabled: true } : o)),
        onChange,
      });

      expect(screen.getByLabelText("Workshop")).toBeDisabled();
      fireEvent.click(screen.getByLabelText("Networking"));
      expect(onChange).toHaveBeenCalledWith(["networking"]);
    });
  });
});
