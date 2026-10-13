// Component tier: renders with Testing Library in jsdom. Arrow-key movement
// between radios is native browser behaviour that jsdom doesn't implement, so
// it's checked manually rather than here.
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import RadioGroup from "./RadioGroup";

const options = [
  { label: "None", value: "none" },
  { label: "Vegan", value: "vegan" },
  { label: "Other", value: "other" },
];

const renderGroup = (props: Partial<React.ComponentProps<typeof RadioGroup>> = {}) =>
  render(
    <RadioGroup
      name="dietary"
      label="Dietary requirements"
      options={options}
      value=""
      onChange={() => {}}
      {...props}
    />,
  );

describe("RadioGroup", () => {
  it("renders one radio per option, grouped under the label", () => {
    renderGroup();

    const group = screen.getByRole("radiogroup", { name: /dietary requirements/i });
    expect(group).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(options.length);
  });

  it("calls onChange with the clicked option's value", () => {
    const onChange = vi.fn();
    renderGroup({ onChange });

    fireEvent.click(screen.getByLabelText("Vegan"));

    expect(onChange).toHaveBeenCalledWith("vegan");
  });

  it("checks only the option matching value", () => {
    renderGroup({ value: "vegan" });

    expect(screen.getByLabelText("Vegan")).toBeChecked();
    expect(screen.getByLabelText("None")).not.toBeChecked();
  });

  describe("required", () => {
    it("hides the asterisk from screen readers and announces (required) instead", () => {
      renderGroup({ required: true });

      expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
      expect(screen.getByRole("radiogroup")).toHaveAccessibleName(
        "Dietary requirements (required)",
      );
      expect(screen.getByRole("radiogroup")).toHaveAttribute("aria-required", "true");
    });

    it("sets native required on the radios so the browser blocks an empty submit", () => {
      renderGroup({ required: true });

      screen.getAllByRole("radio").forEach((radio) => expect(radio).toBeRequired());
      expect(screen.getByLabelText("None")).toBeInvalid();
    });

    it("leaves radios optional when not required", () => {
      renderGroup();

      expect(screen.queryByText("*")).not.toBeInTheDocument();
      screen.getAllByRole("radio").forEach((radio) => expect(radio).not.toBeRequired());
    });
  });

  describe("error", () => {
    it("shows the message and links it to the group", () => {
      renderGroup({ error: "Please select an option" });

      const group = screen.getByRole("radiogroup");
      expect(group).toHaveAttribute("aria-invalid", "true");
      expect(group).toHaveAccessibleDescription("Please select an option");
    });

    it("also links the message on each radio, so it's announced on focus", () => {
      renderGroup({ error: "Please select an option" });

      screen
        .getAllByRole("radio")
        .forEach((radio) => expect(radio).toHaveAccessibleDescription("Please select an option"));
    });

    it("has no invalid state without an error", () => {
      renderGroup();

      expect(screen.getByRole("radiogroup")).not.toHaveAttribute("aria-invalid");
    });
  });

  describe("other text box", () => {
    it("is hidden until the other option is selected", () => {
      renderGroup({ otherValue: "other", value: "vegan" });

      expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    });

    it("appears when the other option is selected and reports typed text", () => {
      const onOtherTextChange = vi.fn();
      renderGroup({ otherValue: "other", value: "other", onOtherTextChange });

      const textbox = screen.getByRole("textbox", { name: /please specify/i });
      fireEvent.change(textbox, { target: { value: "Halal" } });

      expect(onOtherTextChange).toHaveBeenCalledWith("Halal");
    });

    it("is never shown when otherValue isn't set", () => {
      renderGroup({ value: "other" });

      expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    });

    it("clears the typed text when moving off the other option", () => {
      const onChange = vi.fn();
      const onOtherTextChange = vi.fn();
      renderGroup({ otherValue: "other", value: "other", onChange, onOtherTextChange });

      fireEvent.click(screen.getByLabelText("Vegan"));

      expect(onOtherTextChange).toHaveBeenCalledWith("");
      expect(onChange).toHaveBeenCalledWith("vegan");
    });

    it("leaves the text alone when switching between non-other options", () => {
      const onOtherTextChange = vi.fn();
      renderGroup({ otherValue: "other", value: "none", onOtherTextChange });

      fireEvent.click(screen.getByLabelText("Vegan"));

      expect(onOtherTextChange).not.toHaveBeenCalled();
    });
  });

  describe("disabled", () => {
    it("disables every radio when the group is disabled", () => {
      // Only the disabled state is asserted - jsdom's fireEvent.click skips the
      // browser's disabled check and still toggles the input, so "clicks do
      // nothing" was verified manually on /temp-primitives instead
      renderGroup({ disabled: true });

      screen.getAllByRole("radio").forEach((radio) => expect(radio).toBeDisabled());
    });

    it("disables the other text box along with the group", () => {
      renderGroup({ disabled: true, otherValue: "other", value: "other" });

      expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("disables only the option marked disabled", () => {
      renderGroup({ options: [options[0], { ...options[1], disabled: true }] });

      expect(screen.getByLabelText("None")).toBeEnabled();
      expect(screen.getByLabelText("Vegan")).toBeDisabled();
    });
  });
});
