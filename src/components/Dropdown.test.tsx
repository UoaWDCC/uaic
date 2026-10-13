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
      variant="input"
      required={required}
      options={["XS", "S", "M", "L"]}
      value={value}
      onChange={setValue}
      ariaLabel="Size"
      placeholder="Select size"
    />
  );
}

describe("Dropdown input variant", () => {
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

    fireEvent.click(trigger());
    fireEvent.click(option("S"));
    expect(trigger()).not.toHaveAttribute("aria-invalid");
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
    render(
      <Dropdown variant="input" options={["S"]} value="" onChange={vi.fn()} ariaLabel="Size" />,
    );
    expect(trigger()).toHaveTextContent("Select an option");
  });

  it.each([false, true])(
    "preserves keyboard focus across parent updates (required=%s)",
    (required) => {
      const onChange = vi.fn();
      const dropdown = (value: string) => (
        <Dropdown
          variant="input"
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
});

describe("Dropdown default variant", () => {
  it("preserves selection without moving focus on open", () => {
    const onChange = vi.fn();
    render(<Dropdown options={["S", "M"]} value="S" onChange={onChange} ariaLabel="Size" />);
    const button = screen.getByRole("button", { name: "Size" });
    button.focus();
    fireEvent.click(button);
    expect(button).toHaveFocus();
    fireEvent.click(option("M"));
    expect(onChange).toHaveBeenCalledWith("M");
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
