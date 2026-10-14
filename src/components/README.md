# Components

Generic, cross-feature UI only. If a component is used by exactly one
feature, it belongs in that feature's `components/` folder instead - see
`../features/README.md`. The test isn't "could this theoretically be
reused" (almost anything could) - it's "is this actually imported by more
than one feature today."

Current contents and why each one qualifies:

- `Button.tsx`, `ArrowButton.tsx`, `Dropdown.tsx` - plain UI primitives with
  no domain knowledge, used across unrelated features (bulletins, home,
  events, layout, ...).
- `TextInput.tsx` - single-line (`TextInput`) and multiline (`TextArea`) text
  form primitives. An exception to the "used by more than one feature" rule
  below: they're part of the form primitive set from #425, which places them
  here up front for the event registration form and any later forms.
- `RadioGroup.tsx`, `CheckboxGroup.tsx` - single-select (radio) and
  multi-select (checkbox) form primitives for choice fields. An exception to
  the "used by more than one feature" rule below: they're part of the form
  primitive set from #425, which places them here up front for the event
  registration form and any later forms. `SelectOption` (the shared option
  type) is exported from `RadioGroup.tsx`.
- `PageHeader.tsx` - shared page-header layout, used by `bulletins`,
  `about`, `events`, and `faq`.
- `NotFoundContent.tsx` - the 404 page body, rendered from both the
  `(auth)` and `(home)` route groups' `not-found.tsx`.
- `BlueGradient.tsx` - a generic decorative background. Only `joinus` uses
  it today, so by the letter of the rule above it could live in
  `features/joinus/components/` - it's kept here because it's
  content-free and domain-agnostic, the kind of thing other features are
  likely to reach for next. If that hasn't happened by the time you're
  next touching this file, move it.

If you're adding a new component, default to putting it in the feature that
uses it. Promote it here only once a second, unrelated feature actually
needs it - don't pre-guess reuse.
