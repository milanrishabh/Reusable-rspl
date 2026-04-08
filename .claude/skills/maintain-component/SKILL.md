---
name: maintain-component
description: >
  Fix, improve, or update an existing component in the @rspl/react-reusable-ui library.
  Use this skill whenever the user asks to fix, update, improve, or patch a component —
  phrases like "add dark mode to Modal", "Button is missing forwardRef", "Checkbox
  props aren't exported", "fix accessibility on Dropdown", "add tests for Switch",
  or "/maintain-component". Also use it for cross-cutting fixes like "add dark mode
  to all components" or "export prop types for everything". The skill handles targeted
  fixes without accidentally changing unrelated behavior.
---

# maintain-component

You are fixing or improving an existing component in the `@rspl/react-reusable-ui` library. The goal is the smallest correct change — improve exactly what was asked, leave everything else alone.

## Step 1 — Read before touching anything

Always read these before making changes:

1. The component file: `src/components/ui/<ComponentName>.tsx`
2. Its test file: `src/components/ui/__tests__/<ComponentName>.test.tsx` (may not exist yet)
3. Its export in `src/index.ts` (check whether the props type is exported)

Understanding the current state prevents you from accidentally breaking things that already work.

## Step 2 — Apply the fix

Pick the fix type from the user's request. Common patterns:

---

### Dark mode

Audit every Tailwind class that sets a color — background, text, border, ring, placeholder, fill, stroke. For each one that's missing a `dark:` variant, add the appropriate dark counterpart.

**Pattern:** light color → dark color

- `bg-white` → `dark:bg-rspl-neutral-900`
- `bg-rspl-neutral-50` → `dark:bg-rspl-neutral-800`
- `text-rspl-neutral-900` → `dark:text-white`
- `text-rspl-neutral-600` → `dark:text-rspl-neutral-400`
- `border-rspl-neutral-200` → `dark:border-rspl-neutral-700`
- `ring-rspl-primary-500` stays the same in dark mode (primary brand color)

The `cn()` utility from `src/lib/utils/cn.ts` handles class merging — don't restructure the className logic, just add the `dark:` variants inline.

---

### forwardRef

Wrap the component in `React.forwardRef`. Preserve all existing props exactly.

```tsx
export const ComponentName = React.forwardRef<
  HTMLElementType,
  ComponentNameProps
>(({ ...existingProps }, ref) => {
  return <element ref={ref} {...existingProps} />;
});
ComponentName.displayName = "ComponentName";
```

If a `ref` test doesn't exist, add one to the test file.

---

### Props type export

Check whether `<ComponentName>Props` is:

1. Defined and exported from the component file
2. Re-exported from `src/index.ts` with `export type { <ComponentName>Props }`

If the interface exists but isn't exported, add `export` to its declaration. If it's not in `src/index.ts`, add the `export type` line in alphabetical order near the component's existing export.

---

### Accessibility

Common gaps to look for and fix:

- Missing `role` attribute (button without `role="button"` if it's a `<div>`)
- Missing `aria-label` or `aria-labelledby` on interactive elements with no visible text
- Missing `aria-expanded` on toggleable elements (dropdowns, accordions, modals)
- Missing `aria-disabled` when `disabled` prop is true
- Missing keyboard handlers: Escape to close overlays, Enter/Space to activate buttons
- Focus not trapped inside open modals/drawers
- Missing `tabIndex` on focusable non-interactive elements

Only fix the gaps — don't restructure or rewrite the component.

---

### Tests

Add or update tests in `src/components/ui/__tests__/<ComponentName>.test.tsx`.

Write tests for the specific behavior the user mentioned. If the file doesn't exist, create it with a baseline set:

- Renders without crashing
- Renders expected content
- Key interactive behavior
- Accessibility attributes present

Use React Testing Library (`render`, `screen`, `fireEvent`/`userEvent`). Test behavior, not implementation.

---

## Step 3 — Type check

```bash
npx tsc -b --noEmit
```

Zero errors required before reporting done.

## Step 4 — Report

- What changed and why
- What was intentionally left alone
- Any follow-up work that would be valuable but was out of scope

---

## Key file locations

| Purpose         | Path                                                   |
| --------------- | ------------------------------------------------------ |
| Component       | `src/components/ui/<ComponentName>.tsx`                |
| Test            | `src/components/ui/__tests__/<ComponentName>.test.tsx` |
| Barrel          | `src/index.ts`                                         |
| cn() utility    | `src/lib/utils/cn.ts`                                  |
| Tailwind tokens | `src/styles/tailwind.css`                              |
