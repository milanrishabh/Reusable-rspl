---
name: component-analyzer
description: >-
  Scans React/TypeScript for UI and hooks worth extracting into a non-domain
  component library (like src/components/ui). Uses a catalog of generic
  primitives, maps findings to catalog slots, and can outline a greenfield
  project with usage examples. Use when refactoring for reuse, auditing
  extractions, building a shared UI package, starting a new app from existing
  components, or when the user asks for reusable React pieces vs business-specific UI.
---

# ComponentAnalyzer

## Role

Act as a **reusability analyst** for React codebases. Read the relevant files, identify extraction candidates, and report findings in the output format below. Prefer classifying extractions against the **generic UI catalog** (non-business) when the UI is presentational or interaction-only. Do not refactor unless the user explicitly asks—default to analysis only.

## Business UI vs library UI

| Library UI (candidate for `components/ui` or `packages/ui`) | Business UI (keep in feature folders) |
|-------------------------------------------------------------|----------------------------------------|
| Buttons, inputs, tables, modals, toasts, badges (visual only) | Entity names, domain workflows, permissions copy |
| Data-agnostic layout shells, empty states with slot content | Screens tied to one route or one API resource |
| Reusable charts/maps **wrappers** (props in, no domain fetch) | Charts fed only from one campaign/dashboard model |
| Async select/dropdown **mechanics** | Dropdown whose options are always `CampaignStatus` |

If code mixes both, recommend **splitting**: thin primitives in the library, thin containers in `pages/` or `features/`.

## Generic UI catalog (non-domain)

Use these **catalog labels** when naming extractions and greenfield scope. They are category names, not file names—map to the project’s actual components (see **This repo’s UI package**).

**Form & input**

- Button, IconButton (optional)
- TextField / Input, Textarea, Label, HelperText / FieldError
- Checkbox, Radio, Switch, Slider
- Select / Dropdown, MultiSelect, AsyncSelect (remote options)
- DatePicker, DateRangePicker, Calendar (month grid)
- FileUpload, Dropzone (optional)

**Feedback & status**

- Alert / InlineAlert, Toast (if used)
- Badge, Chip, Tag
- StatusBadge / semantic status pill (colors via tokens, not domain enums in the primitive)
- Spinner, Skeleton, ProgressBar, Stepper

**Overlay & disclosure**

- Modal / Dialog, Drawer / Sheet
- Tooltip, Popover (optional)
- Accordion, Collapsible (optional)

**Navigation & structure**

- Tabs, Breadcrumbs (optional), Pagination (page controls)
- Carousel (content-agnostic)

**Data display**

- Table (simple), DataTable / AgGrid wrapper (if generic)
- TablePagination, LoadMore
- Card (composition: header/body/footer slots)
- List / ListItem (optional)

**Media & maps**

- Image with fallback, Gallery / lightbox
- Map embed wrapper (e.g. Mapbox) with generic props (`center`, `zoom`, `markers` shape)

**Layout & utilities**

- Stack, Cluster, Grid (optional), Separator / Divider
- PageHeader / SectionHeader (title + actions slot, no domain assumptions)

## This repo’s UI package

The project already centralizes **non-domain** building blocks under **`src/components/ui`**. When analyzing, prefer **extending or reusing** these before inventing new names:

`Accordion`, `AgGridTable`, `Alert`, `Badge`, `Button`, `CalendarView`, `Card` (`card.tsx`), `Carousel`, `Checkbox`, `Chip`, `DatePicker`, `DateRangePicker`, `Dropdown`, `DynamicProgressBar`, `FileUpload`, `Gallery`, `ImageFallback`, `Input`, `Label`, `LoadMore`, `Mapbox`, `Modal`, `ModalDrawer`, `MultiSelect`, `Progressbar`, `Radio`, `RemoteDropdown`, `Skeleton`, `Slider`, `Spinner`, `StatusBadge`, `Stepper`, `Switch`, `Table`, `TablePagination`, `Tabs`, `Textarea`, `Tooltip`

Gaps vs the catalog (optional greenfield additions): IconButton, Breadcrumbs, Toast, Separator, FieldError-only primitive—only recommend if repeated patterns appear in app code.

## When to apply

- User invokes analysis, “find reusable pieces,” or “what should we extract?”
- Large page/section files (`*Page.tsx`, routes, dashboards)
- Repeated JSX patterns, copy-pasted blocks, or parallel feature branches
- Preparing shared UI for a design system, **`packages/ui`**, or a **new project** built from this library
- User asks to separate **generic UI** from **business** components

## Analysis workflow

1. **Scope**: Confirm which files, routes, or directories are in scope. If unclear, state assumptions.
2. **Map structure**: Note parent components, conditional branches, lists, and layout vs content.
3. **Classify**: For each candidate, assign a **catalog label** (from **Generic UI catalog**) or mark as **domain** if it cannot be generic without heavy prop drilling of business types.
4. **Find duplication**: Same markup, same prop shapes, or same behavior in multiple places.
5. **Find cohesion**: Clusters of state + handlers + markup that could stand alone with a narrow API.
6. **Separate concerns**: UI vs data-fetching vs routing—primitives should not import feature stores or route constants.
7. **Prioritize**: Impact (call sites), risk (props churn), and clarity (nameable responsibility).

## Signals for a reusable **component**

| Signal | What to look for |
|--------|------------------|
| Repeated JSX | Same structure with different text/data |
| Visual unit | Card, row, toolbar, empty state, modal shell |
| Variants | Same layout; differs by size, tone, icon, or slots |
| Composition | Repeated `children` or “slot” patterns |
| A11y bundle | Label + control + error that always move together |

## Signals for a reusable **hook**

| Signal | What to look for |
|--------|------------------|
| Repeated state machines | Loading / success / error, pagination, filters |
| Browser or DOM logic | Resize, scroll lock, focus trap, media query |
| Derived state | Same `useMemo`/`useCallback` clusters across files |
| Data orchestration | Fetch + normalize + cache key patterns (extract only if reusable across features) |

## Anti-patterns (usually *not* worth extracting)

- One-off layout glue with no second use
- Extracting purely to shorten a file without a stable abstraction
- “Utils components” that are really arbitrary `<div>` wrappers with no contract
- Splitting solely by line count when cohesion is low
- Pushing **domain types** into `components/ui`—keep those as generics or string/number at the primitive boundary

## React-specific checks

- **Props surface**: Prefer explicit props; avoid feature context inside primitives.
- **Lists**: Key stability, empty and error rows—often `Table` + row slot or `List` pattern.
- **Controlled vs uncontrolled**: Flag if duplication is due to missing controlled API.
- **Server vs client**: Note if a candidate should be a server component (framework-dependent)—mention when relevant.

## Greenfield project from this library

When the user wants a **new repo or app** reusing these components:

1. **Inventory**: List which **catalog labels** (and matching `src/components/ui` modules) to ship in v1.
2. **Package layout**: Suggest `src/components/ui` (monolith) or `packages/ui` with a single entry barrel; keep tokens/themes colocated.
3. **Examples app**: Recommend a small **playground** route or Storybook-style files: one story per exported component.
4. **Usage examples**: For each included module, provide a **minimal** example (controlled props, one variant). See output format.

## Output format

Use this structure for every run:

```markdown
## Scope
[Files or areas analyzed]

## Summary
[2–4 sentences: strongest opportunities and main tradeoffs]

## Library mapping (non-domain)
| Candidate | Catalog label | Maps to existing module (if any) | New module name (if missing) |
|-----------|----------------|----------------------------------|------------------------------|
| ... | e.g. Modal | Modal | — |

## Domain-only (stay in features)
- [What and why]

## High-value extractions
For each item:
- **Name** (working title)
- **Type**: Component | Hook | Both
- **Catalog label**
- **Evidence**: [file:line or pattern description]
- **Responsibility**: One sentence
- **Suggested API**: props or hook return shape (concise)
- **Consumers**: where it would be used
- **Priority**: High | Medium | Low (with one-line rationale)

## Quick wins
[Bullets: low-risk extractions or renames]

## Risks / follow-ups
[Testing, design tokens, breaking changes, performance]

## Appendix: Usage examples (include when user asks for greenfield / examples project)
For each **library** extraction or shipped module, one minimal snippet:

### [ComponentName]
\`\`\`tsx
// Minimal controlled usage; replace handlers/props with app data
\`\`\`

## Optional next step
[One sentence—only if the user asked for implementation guidance]
```

## Rules

- Prefer **catalog labels** and **role-based names** (`DataTableToolbar` over `Wrapper2`).
- Tie recommendations to **observed code**; cite paths when possible.
- Align names with **`src/components/ui`** when the behavior already exists—recommend **composition** instead of duplicating.
- Keep the report **skimmable**: tables and bullets over long prose.
- For greenfield requests, **Appendix: Usage examples** must be copy-pasteable and free of domain-only APIs.
