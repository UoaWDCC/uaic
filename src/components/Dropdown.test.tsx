// Colocated with the component it covers - checks opening, closing and picking
// an option, and that re-picking the current value doesn't fire onChange.
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from "./Dropdown";

const OPTIONS = ["All years", "2025", "2024"];

const renderDropdown = (value = "All years") => {
  const onChange = vi.fn();
  render(
    <Dropdown options={OPTIONS} value={value} onChange={onChange} ariaLabel="Filter by year" />,
  );
  return { onChange, toggle: screen.getByRole("button", { name: "Filter by year" }) };
};

describe("Dropdown", () => {
  it("starts closed, showing the current value", () => {
    const { toggle } = renderDropdown("2025");
    expect(toggle).toHaveTextContent("2025");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryAllByRole("option")).toHaveLength(0);
  });

  it("lists every option when opened, marking the current one selected", () => {
    const { toggle } = renderDropdown("2025");
    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    const options = screen.getAllByRole("option");
    expect(options.map((option) => option.textContent)).toEqual(OPTIONS);
    expect(screen.getByRole("option", { name: "2025" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("option", { name: "2024" })).toHaveAttribute("aria-selected", "false");
  });

  it("calls onChange with the picked option and closes", () => {
    const { onChange, toggle } = renderDropdown();
    fireEvent.click(toggle);
    fireEvent.click(screen.getByRole("option", { name: "2024" }));

    expect(onChange).toHaveBeenCalledExactlyOnceWith("2024");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryAllByRole("option")).toHaveLength(0);
  });

  it("closes without calling onChange when the current value is picked again", () => {
    const { onChange, toggle } = renderDropdown();
    fireEvent.click(toggle);
    fireEvent.click(screen.getByRole("option", { name: "All years" }));

    expect(onChange).not.toHaveBeenCalled();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes when the toggle is clicked again", () => {
    const { toggle } = renderDropdown();
    fireEvent.click(toggle);
    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryAllByRole("option")).toHaveLength(0);
  });
});
