---
name: add-component
description: >
  Full workflow for adding a new UI component to the @rspl/reusable-ui library.
  Use this skill whenever the user asks to add, create, or build a new component,
  even if they say things like "I need a Tooltip component", "can you make a Rating
  widget", "add a new component called X", or "/add-component". Covers creating the
  file, writing the implementation, exporting from the barrel, updating the subpath
  manifest, regenerating subpaths, and writing tests — all in one go.
---

# add-component

You are adding a new UI component to the `@rspl/reusable-ui` React library. Work through the steps below in order. The goal is a complete, library-quality component — not a prototype.

## Step 1 — Clarify intent

If the component name or purpose is missing from the user's message, ask for:

- **Component name** (PascalCase, e.g. `Rating`, `ColorPicker`)
- **One-sentence description** of what it does

Don't ask for anything else up front — discover what you need by reading existing components in step 2.

## Step 2 — Read before writing

Read these files to understand conventions before touching anything:

1. `src/index.ts` — to see current export patterns
2. One or two **similar** existing components from `src/components/ui/` — pick ones with comparable complexity (e.g. for a new input, read `src/components/ui/Input.tsx` and `src/components/ui/Checkbox.tsx`)
3. `scripts/lib-subpaths-manifest.mjs` — to understand the manifest format

This reading step is not optional. The library has established patterns for props, dark mode, accessibility, and cn() usage. Match them.

## Step 3 — Create the component file

Write `src/components/ui/<ComponentName>.tsx`.

**Required patterns:**

- Export a `<ComponentName>Props` interface (named export, not inline)
- Use `cn()` from `"../../lib/utils/cn"` for all className merging
- Apply `dark:` Tailwind variants on every surface color, text color, and border class
- Add `forwardRef` if the component wraps a focusable element (input, button, select, textarea, or a container that manages focus)
- Include appropriate ARIA attributes (`role`, `aria-label`, `aria-expanded`, `aria-disabled`, etc.)
- Handle keyboard interactions that users expect (Escape to close, Enter/Space to activate)
- Accept a `className` prop so consumers can extend styles
- No `any` types — TypeScript strict throughout
- Named export only (no `export default`) unless the existing file pattern uses default

**Color token reference** (from `src/styles/tailwind.css`):

- Primary: `rspl-primary-{50–900}`
- Secondary: `rspl-secondary-{50–900}`
- Neutral: `rspl-neutral-{50–900}`
- Semantic: `rspl-success-*`, `rspl-error-*`, `rspl-warning-*`

## Step 4 — Export from the barrel

Edit `src/index.ts`:

- Add `export { <ComponentName> } from "./components/ui/<ComponentName>";`
- Add `export type { <ComponentName>Props } from "./components/ui/<ComponentName>";`
- Insert in alphabetical order relative to nearby exports

## Step 5 — Update the subpath manifest

Edit `scripts/lib-subpaths-manifest.mjs`.

Add an entry with the kebab-case key. Separate runtime values from type-only exports:

```js
"component-name": {
  values: ["ComponentName"],
  types: ["ComponentNameProps"],
},
```

Place it in the correct category comment block (Primitives, Display, Overlays, etc.).

## Step 6 — Regenerate subpaths

```bash
npm run gen:subpaths
```

This writes `src/subpaths/<component-name>.ts` and patches `package.json` exports. Verify the new file looks correct.

## Step 7 — Write tests

Create `src/components/ui/__tests__/<ComponentName>.test.tsx`.

**Required test coverage:**

- Renders without crashing with minimal props
- Renders content / children correctly
- Applies custom `className` alongside default classes
- Key interactive behaviors (click, keyboard, open/close, value change)
- Accessibility: ARIA attributes present, keyboard navigation works
- Ref forwarding (if `forwardRef` was used)
- Disabled state (if the component supports it)

Use React Testing Library patterns already in the codebase — `render`, `screen`, `fireEvent` / `userEvent`, `within`. Avoid testing implementation details (internal state, component internals).

## Step 8 — Type check

```bash
npx tsc -b --noEmit
```

Fix any errors before reporting done. Zero errors is the only acceptable outcome.

## Step 9 — Report

Tell the user:

- Files created/modified (component, index.ts, manifest, subpath file, test)
- Any props or behaviors that weren't implemented yet (and why — keep scope tight)
- Any residual risks (e.g. "dark mode classes added but not visually verified")

---

## Key file locations

| Purpose           | Path                                                              |
| ----------------- | ----------------------------------------------------------------- |
| Component         | `src/components/ui/<ComponentName>.tsx`                           |
| Test              | `src/components/ui/__tests__/<ComponentName>.test.tsx`            |
| Barrel            | `src/index.ts`                                                    |
| Subpath manifest  | `scripts/lib-subpaths-manifest.mjs`                               |
| Generated subpath | `src/subpaths/<component-name>.ts` (auto-written by gen:subpaths) |
| cn() utility      | `src/lib/utils/cn.ts`                                             |
| Tailwind tokens   | `src/styles/tailwind.css`                                         |
| Hooks             | `src/lib/hooks/`                                                  |
