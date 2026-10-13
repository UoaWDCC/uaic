import { useState } from "react";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Dropdown from "./Dropdown";

afterEach(cleanup);

const trigger = () => screen.getByRole("combobox", { name: "Size" });
const menu = () => within(screen.getByRole("listbox", { name: "Size" }));
const option = (name: string) => menu().getByRole("option", { name });
const pressKey = (key: string) => fireEvent.keyDown(document.activeElement!, { key });

function InputDropdown({ required = false, initialValue = "XS" }) {
  const [value, setValue] = useState(initialValue);
  return (
    <Dropdown
      required={required}
      options={["XS", "S", "M", "L"]}
      value={value}
      onChange={setValue}
      ariaLabel="Size"
      placeholder="Select size"
    />
  );
}

describe("Dropdown", () => {
  it("marks an empty required dropdown invalid on submit and clears the error after selection", () => {
    const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => event.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <InputDropdown required initialValue="" />
        <button type="submit">Submit</button>
      </form>,
    );
    expect(trigger()).not.toHaveAttribute("aria-invalid");
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(trigger()).toHaveAttribute("aria-invalid", "true");
    expect(trigger()).toHaveAccessibleDescription("Please select an option");
    expect(trigger()).toHaveFocus();

    fireEvent.click(trigger());
    fireEvent.click(option("S"));
    expect(trigger()).not.toHaveAttribute("aria-invalid");
    expect(screen.queryByText("Please select an option")).not.toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Size form value" })).toHaveValue("S");
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("moves focus with arrow keys, Home and End, including wrapping at either end", () => {
    render(<InputDropdown required />);
    trigger().focus();
    pressKey("ArrowDown");
    expect(option("XS")).toHaveFocus();
    pressKey("ArrowDown");
    expect(option("S")).toHaveFocus();
    pressKey("ArrowUp");
    expect(option("XS")).toHaveFocus();
    pressKey("ArrowUp");
    expect(option("L")).toHaveFocus();
    pressKey("ArrowDown");
    expect(option("XS")).toHaveFocus();
    pressKey("End");
    expect(option("L")).toHaveFocus();
    pressKey("Home");
    expect(option("XS")).toHaveFocus();
  });

  it("closes on Escape and returns focus to the trigger without changing the value", () => {
    render(<InputDropdown required />);
    fireEvent.click(trigger());
    pressKey("ArrowDown");
    expect(option("S")).toHaveFocus();
    pressKey("Escape");
    expect(trigger()).toHaveFocus();
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(trigger()).toHaveTextContent("XS");
  });

  it("offers None for an optional dropdown and selecting it clears the value", () => {
    render(<InputDropdown />);
    fireEvent.click(trigger());
    fireEvent.click(option("None"));
    expect(trigger()).toHaveTextContent("Select size");
    expect(screen.getByRole("combobox", { name: "Size form value" })).toHaveValue("");
    expect(trigger()).toHaveFocus();
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(trigger());
    expect(option("None")).toHaveAttribute("aria-selected", "true");
  });

  it("does not offer None for a required dropdown", () => {
    render(<InputDropdown required />);
    fireEvent.click(trigger());
    expect(menu().queryByRole("option", { name: "None" })).not.toBeInTheDocument();
    expect(menu().getAllByRole("option")).toHaveLength(4);
  });

  it("falls back to the same placeholder text as the form value when none is given", () => {
    render(<Dropdown options={["S"]} value="" onChange={vi.fn()} ariaLabel="Size" />);
    expect(trigger()).toHaveTextContent("Select an option");
  });

  it.each([false, true])(
    "preserves keyboard focus across parent updates (required=%s)",
    (required) => {
      const onChange = vi.fn();
      const dropdown = (value: string) => (
        <Dropdown
          required={required}
          options={["XS", "S", "M", "L"]}
          value={value}
          onChange={onChange}
          ariaLabel="Size"
        />
      );
      const { rerender } = render(dropdown("XS"));
      fireEvent.click(trigger());
      expect(option("XS")).toHaveFocus();
      pressKey("ArrowDown");
      pressKey("ArrowDown");
      expect(option("M")).toHaveFocus();

      rerender(dropdown("XS"));
      expect(option("M")).toHaveFocus();
      rerender(dropdown("S"));
      expect(option("M")).toHaveFocus();

      pressKey("Escape");
      fireEvent.click(trigger());
      expect(option("S")).toHaveFocus();
      fireEvent.click(option("L"));
      expect(onChange).toHaveBeenCalledWith("L");
      expect(trigger()).toHaveFocus();
      expect(trigger()).toHaveAttribute("aria-expanded", "false");
    },
  );

  describe("error", () => {
    it("marks the trigger invalid and links the message", () => {
      render(
        <Dropdown
          options={["S"]}
          value=""
          onChange={vi.fn()}
          ariaLabel="Size"
          error="Please select a size"
        />,
      );
      expect(trigger()).toHaveAttribute("aria-invalid", "true");
      expect(trigger()).toHaveAccessibleDescription("Please select a size");
    });

    it("has no invalid state without an error", () => {
      render(<InputDropdown />);
      expect(trigger()).not.toHaveAttribute("aria-invalid");
      expect(trigger()).not.toHaveAttribute("aria-describedby");
    });
  });

  describe("disabled", () => {
    it("disables the trigger and the form value, and won't open", () => {
      render(<Dropdown options={["S"]} value="S" onChange={vi.fn()} ariaLabel="Size" disabled />);
      expect(trigger()).toBeDisabled();
      expect(screen.getByRole("combobox", { name: "Size form value" })).toBeDisabled();
      fireEvent.click(trigger());
      fireEvent.keyDown(trigger(), { key: "ArrowDown" });
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });
});
