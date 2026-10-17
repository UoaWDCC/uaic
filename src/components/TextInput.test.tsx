// Component tier: renders with Testing Library in jsdom. Both primitives share
// their wiring, so every behaviour is checked against each of them.
import { describe, it, expect, vi } from "vitest";
import { useState } from "react";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { TextInput, TextArea } from "./TextInput";

// Typed as the props both share, so one table can drive both components
type SharedProps = Omit<
  React.ComponentProps<typeof TextInput>,
  keyof React.DOMAttributes<Element>
> &
  Pick<React.ComponentProps<typeof TextInput>, "onChange" | "onInvalid">;

const primitives: { name: string; Component: React.ComponentType<SharedProps> }[] = [
  { name: "TextInput", Component: TextInput },
  { name: "TextArea", Component: TextArea as React.ComponentType<SharedProps> },
];

describe.each(primitives)("$name", ({ Component }) => {
  const renderField = (props: Partial<SharedProps> = {}) =>
    render(<Component label="Full name" value="" onChange={() => {}} {...props} />);

  const field = () => screen.getByRole("textbox", { name: /full name/i });
  // Border/background states live on the wrapper box around the element
  const box = () => field().parentElement;

  it("links the label to the field", () => {
    renderField();

    expect(field()).toBeInTheDocument();
  });

  it("shows the value and placeholder", () => {
    renderField({ value: "Jane", placeholder: "Enter your name" });

    expect(field()).toHaveValue("Jane");
    expect(field()).toHaveAttribute("placeholder", "Enter your name");
  });

  it("calls onChange with the typed string, not the event", () => {
    const onChange = vi.fn();
    renderField({ onChange });

    fireEvent.change(field(), { target: { value: "Jane" } });

    expect(onChange).toHaveBeenCalledWith("Jane");
  });

  it("passes native attributes through to the element", () => {
    renderField({ name: "fullName", maxLength: 50 });

    expect(field()).toHaveAttribute("name", "fullName");
    expect(field()).toHaveAttribute("maxLength", "50");
  });

  it("uses a passed id instead of generating one, keeping the label linked", () => {
    renderField({ id: "full-name" });

    expect(field()).toHaveAttribute("id", "full-name");
  });

  it("can be named by aria-label when there's no visible label", () => {
    render(<Component aria-label="Please specify" value="" onChange={() => {}} />);

    expect(screen.getByRole("textbox", { name: "Please specify" })).toBeInTheDocument();
  });

  describe("required", () => {
    it("hides the asterisk from screen readers and announces (required) instead", () => {
      renderField({ required: true });

      expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
      expect(field()).toHaveAccessibleName("Full name (required)");
    });

    it("sets native required so the browser blocks an empty submit", () => {
      renderField({ required: true });

      expect(field()).toBeRequired();
      expect(field()).toBeInvalid();
    });

    it("is optional by default", () => {
      renderField();

      expect(screen.queryByText("*")).not.toBeInTheDocument();
      expect(field()).not.toBeRequired();
    });
  });

  describe("error", () => {
    it("marks the field invalid and links the message", () => {
      renderField({ error: "Please enter your name" });

      expect(field()).toHaveAttribute("aria-invalid", "true");
      expect(field()).toHaveAccessibleDescription("Please enter your name");
    });

    it("uses the destructive token for the border", () => {
      renderField({ error: "Please enter your name" });

      expect(box()).toHaveClass("border-destructive");
    });

    it("keeps a caller's aria-describedby alongside the error", () => {
      render(
        <>
          <p id="hint">As it appears on your student ID</p>
          <Component
            label="Full name"
            value=""
            onChange={() => {}}
            aria-describedby="hint"
            error="Please enter your name"
          />
        </>,
      );

      expect(field()).toHaveAccessibleDescription(
        "As it appears on your student ID Please enter your name",
      );
    });

    it("has no invalid state without an error", () => {
      renderField();

      expect(field()).not.toHaveAttribute("aria-invalid");
      expect(field()).not.toHaveAttribute("aria-describedby");
      expect(box()).not.toHaveClass("border-destructive");
    });
  });

  describe("native validation on submit", () => {
    // Stateful wrapper so typing actually updates the value, like a real form
    const Controlled = (props: Partial<SharedProps>) => {
      const [value, setValue] = useState("");
      return <Component label="Full name" required value={value} onChange={setValue} {...props} />;
    };

    const renderForm = (props: Partial<SharedProps> = {}) => {
      const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
      render(
        <form onSubmit={onSubmit}>
          <Controlled {...props} />
          <button type="submit">Submit</button>
        </form>,
      );
      const submit = () => fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      return { onSubmit, submit };
    };

    it("shows the invalid state and message instead of the browser popup", () => {
      const { onSubmit, submit } = renderForm();
      expect(field()).not.toHaveAttribute("aria-invalid");

      submit();

      expect(onSubmit).not.toHaveBeenCalled();
      expect(field()).toHaveAttribute("aria-invalid", "true");
      expect(box()).toHaveClass("border-destructive");
      expect(field()).toHaveAccessibleDescription("Please fill out this field");
      expect(field()).toHaveFocus();
    });

    it("clears the error once the user types, then submits", () => {
      const { onSubmit, submit } = renderForm();
      submit();

      fireEvent.change(field(), { target: { value: "Jane" } });

      expect(field()).not.toHaveAttribute("aria-invalid");
      expect(screen.queryByText("Please fill out this field")).not.toBeInTheDocument();
      submit();
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it("clears the error when the parent sets the value, e.g. a prefill or reset", () => {
      const Prefill = () => {
        const [value, setValue] = useState("");
        return (
          <form onSubmit={(e) => e.preventDefault()}>
            <Component label="Full name" required value={value} onChange={setValue} />
            <button type="button" onClick={() => setValue("Jane")}>
              Prefill
            </button>
            <button type="submit">Submit</button>
          </form>
        );
      };
      render(<Prefill />);
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));
      expect(field()).toHaveAttribute("aria-invalid", "true");

      fireEvent.click(screen.getByRole("button", { name: "Prefill" }));

      expect(field()).not.toHaveAttribute("aria-invalid");
      expect(screen.queryByText("Please fill out this field")).not.toBeInTheDocument();
    });

    it("lets a caller's error message win over the built-in one", () => {
      const { submit } = renderForm({ error: "Please enter your full name" });

      submit();

      expect(field()).toHaveAccessibleDescription("Please enter your full name");
    });

    it("still calls a caller's onInvalid", () => {
      const onInvalid = vi.fn();
      const { submit } = renderForm({ onInvalid });

      submit();

      expect(onInvalid).toHaveBeenCalledTimes(1);
    });

    it("only focuses the first invalid field in the form", () => {
      render(
        <form onSubmit={(e) => e.preventDefault()}>
          <Component label="First" required value="" onChange={() => {}} />
          <Component label="Second" required value="" onChange={() => {}} />
          <button type="submit">Submit</button>
        </form>,
      );

      fireEvent.click(screen.getByRole("button", { name: "Submit" }));

      expect(screen.getByLabelText(/first/i)).toHaveFocus();
      expect(screen.getByLabelText(/second/i)).toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("can't-edit states", () => {
    it("disabled - greys out and disables the field", () => {
      renderField({ value: "Jane", disabled: true });

      expect(field()).toBeDisabled();
      expect(box()).toHaveClass("bg-neutral-100");
    });

    it("readOnly - greys out but stays enabled, so it's focusable and submitted", () => {
      renderField({ value: "Jane", readOnly: true });

      expect(field()).toBeEnabled();
      expect(field()).toHaveAttribute("readonly");
      expect(box()).toHaveClass("bg-neutral-100");
    });

    it("drops the error border while locked, since the user can't fix it", () => {
      renderField({ disabled: true, error: "Please enter your name" });

      expect(box()).not.toHaveClass("border-destructive");
    });

    it("is white and editable by default", () => {
      renderField();

      expect(field()).toBeEnabled();
      expect(field()).not.toHaveAttribute("readonly");
      expect(box()).toHaveClass("bg-white");
    });
  });
});

describe("TextInput", () => {
  describe("overflow fade", () => {
    // jsdom has no layout, so stub the scroll geometry and fire a scroll
    const scrollTo = async (input: HTMLElement, scrollLeft: number, scrollWidth = 500) => {
      Object.defineProperty(input, "scrollWidth", { configurable: true, value: scrollWidth });
      Object.defineProperty(input, "clientWidth", { configurable: true, value: 200 });
      Object.defineProperty(input, "scrollLeft", { configurable: true, value: scrollLeft });
      fireEvent.scroll(input);
      await act(() => new Promise((resolve) => requestAnimationFrame(() => resolve(undefined))));
    };

    const renderLong = () => {
      render(<TextInput label="Name" value="A very long name" onChange={() => {}} />);
      return screen.getByLabelText("Name");
    };

    it("has no fade when the text fits", async () => {
      const input = renderLong();
      await scrollTo(input, 0, 200);

      expect(input.style.maskImage).toBe("");
    });

    it("fades only the right edge at the start of long text", async () => {
      const input = renderLong();
      await scrollTo(input, 0);

      expect(input.style.maskImage).toMatch(
        /^linear-gradient\(to right, (#000|rgb\(0, 0, 0\)), .*transparent\)$/,
      );
    });

    it("fades both edges when scrolled into the middle", async () => {
      const input = renderLong();
      await scrollTo(input, 150);

      expect(input.style.maskImage).toMatch(
        /^linear-gradient\(to right, transparent, .*transparent\)$/,
      );
    });

    it("fades only the left edge at the end", async () => {
      const input = renderLong();
      await scrollTo(input, 300);

      expect(input.style.maskImage).toMatch(
        /^linear-gradient\(to right, transparent, .*(#000|rgb\(0, 0, 0\))\)$/,
      );
    });

    it("keeps a caller's own style", async () => {
      render(
        <TextInput label="Name" value="x" onChange={() => {}} style={{ letterSpacing: "1px" }} />,
      );
      const input = screen.getByLabelText("Name");
      await scrollTo(input, 150);

      expect(input).toHaveStyle({ letterSpacing: "1px" });
      expect(input.style.maskImage).not.toBe("");
    });
  });

  it("shows the browser's message for other native checks, e.g. type=email", () => {
    render(
      <form onSubmit={(e) => e.preventDefault()}>
        <TextInput label="Email" type="email" value="not-an-email" onChange={() => {}} />
        <button type="submit">Submit</button>
      </form>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    const email = screen.getByLabelText("Email");
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveAccessibleDescription((email as HTMLInputElement).validationMessage);
    expect((email as HTMLInputElement).validationMessage).not.toBe("");
  });

  it("defaults to type text but accepts others", () => {
    const { rerender } = render(<TextInput label="Email" value="" onChange={() => {}} />);
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "text");

    rerender(<TextInput label="Email" type="email" value="" onChange={() => {}} />);
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
  });
});

describe("TextArea", () => {
  it("renders a multiline textarea with 6 rows by default", () => {
    render(<TextArea label="Anything else?" value="" onChange={() => {}} />);

    const textarea = screen.getByLabelText("Anything else?");
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveAttribute("rows", "6");
  });
});
