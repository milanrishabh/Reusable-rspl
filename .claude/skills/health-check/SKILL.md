---
name: health-check
description: >
  Run a full health check on the @rspl/reusable-ui library and report what passes
  and what needs fixing. Use this skill whenever the user asks to check, verify, or
  validate the library's state — phrases like "/health-check", "is everything ok",
  "check the build", "are all components exported", "run the tests", "validate the
  library", "what's broken", or "pre-PR check". Also use it proactively before a
  release or after a large batch of changes.
---

# health-check

Run all five checks below in parallel where possible, then print a clean summary. Don't stop at the first failure — run everything and report the full picture.

---

## Check 1 — TypeScript

```bash
npx tsc -b --noEmit 2>&1
```

- **Pass:** no output (exit code 0)
- **Fail:** list each error with file + line

---

## Check 2 — Lint (real errors only)

```bash
npm run lint 2>&1
```

Filter out CRLF/prettier whitespace warnings — they are pre-existing noise on Windows and not actionable:

```bash
npm run lint 2>&1 | grep -v "Delete.*prettier" | grep -v "prettier/prettier"
```

- **Pass:** no remaining errors
- **Fail:** list each real error with rule name and file

---

## Check 3 — Tests

```bash
npm run test -- --run 2>&1
```

- **Pass:** all tests pass — report the count (e.g. "47 passed")
- **Fail:** list each failing test with its describe/it path

---

## Check 4 — Public API surface

Every `.tsx` file in `src/components/ui/` (excluding subdirectories like `__tests__`) should have at least one export in `src/index.ts`.

Steps:

1. List all component files: `src/components/ui/*.tsx`
2. For each file, extract the component name (PascalCase filename)
3. Check whether that name appears in `src/index.ts`
4. Report any components that are defined but not exported

> Note: some files export multiple named exports (e.g. `Card.tsx` → `Card`, `CardHeader`, etc.) — checking the filename is sufficient.

---

## Check 5 — Subpath alignment

Every key in `scripts/lib-subpaths-manifest.mjs` should have a matching generated file at `src/subpaths/<key>.ts`.

Steps:

1. Read all keys from `scripts/lib-subpaths-manifest.mjs`
2. Check each expected file exists at `src/subpaths/<key>.ts`
3. Also check the reverse: any `.ts` file in `src/subpaths/` that has no manifest entry (stale generated file)
4. Report mismatches in both directions

If mismatches exist, the fix is: `npm run gen:subpaths`

---

## Summary format

Print this table after all checks complete:

```
@rspl/reusable-ui — Health Check
─────────────────────────────────────────────────
✓  TypeScript       0 errors
✓  Lint             0 errors  (CRLF warnings ignored)
✓  Tests            47 passed, 0 failed
✓  API surface      35 components exported
✓  Subpath files    39/39 aligned
─────────────────────────────────────────────────
Result: HEALTHY ✓
```

Or if there are failures:

```
@rspl/reusable-ui — Health Check
─────────────────────────────────────────────────
✗  TypeScript       2 errors  ← see below
✓  Lint             0 errors
✓  Tests            47 passed, 0 failed
✗  API surface      1 component not exported  ← see below
✓  Subpath files    39/39 aligned
─────────────────────────────────────────────────
Result: NEEDS ATTENTION ✗
```

Then list the details for each failing check directly below the table.

---

## Key file locations

| Purpose            | Path                                |
| ------------------ | ----------------------------------- |
| Components         | `src/components/ui/*.tsx`           |
| Barrel             | `src/index.ts`                      |
| Subpath manifest   | `scripts/lib-subpaths-manifest.mjs` |
| Generated subpaths | `src/subpaths/*.ts`                 |
| Regenerate command | `npm run gen:subpaths`              |
