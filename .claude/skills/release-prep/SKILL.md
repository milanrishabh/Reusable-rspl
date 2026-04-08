---
name: release-prep
description: >
  Prepare the @rspl/react-reusable-ui library for an npm publish. Use this skill whenever
  the user wants to cut a release, bump the version, or publish the package — phrases
  like "/release-prep", "release a patch", "bump to 1.1.0", "prepare for publish",
  "ready to release", "publish to npm", "what do I need to do to ship this", or
  "release minor version". Runs the full validation pipeline and walks through every
  step so nothing gets missed.
---

# release-prep

Walk through every step needed to safely publish `@rspl/react-reusable-ui` to npm. Stop at each gate — if something fails, fix it before moving on.

---

## Step 1 — Read current version

Read `package.json` and extract the current `"version"` field.

---

## Step 2 — Compute new version

If the user provided a bump type (`patch`, `minor`, `major`) or an explicit version string (`1.2.0`), compute the new version:

| Current | patch | minor | major |
| ------- | ----- | ----- | ----- |
| 1.0.0   | 1.0.1 | 1.1.0 | 2.0.0 |
| 1.2.3   | 1.2.4 | 1.3.0 | 2.0.0 |

If no bump type was given, ask the user which kind of change this is:

- **patch** — bug fixes, no API changes
- **minor** — new features, backwards-compatible
- **major** — breaking API changes

---

## Step 3 — Confirm before proceeding

Show the user:

```
Current version: 1.0.0
New version:     1.0.1  (patch)

Proceed? (yes / no)
```

Wait for confirmation. Don't touch `package.json` yet.

---

## Step 4 — Health check

Run all three validation commands. All must pass before continuing.

**TypeScript:**

```bash
npx tsc -b --noEmit 2>&1
```

**Lint** (filter CRLF noise):

```bash
npm run lint 2>&1 | grep -v "Delete.*prettier" | grep -v "prettier/prettier"
```

**Tests:**

```bash
npm run test -- --run 2>&1
```

If anything fails, report the errors clearly and **stop**. The release should not proceed with a broken build. Tell the user what to fix.

---

## Step 5 — Build the library

```bash
npm run build 2>&1
```

After the build, verify the `dist/` directory contains exactly these files (there may be others, but these are required):

- `dist/index.js` — ESM bundle
- `dist/index.cjs` — CommonJS bundle
- `dist/index.d.ts` — TypeScript declarations
- `dist/style.css` — Tailwind CSS output

List the dist files that were generated. If any required file is missing, report it as a blocker.

---

## Step 6 — Dry-run pack

```bash
npm pack --dry-run 2>&1
```

Show the full file list to the user. Flag anything unexpected — i.e. anything **not** under `dist/`. The `files` field in `package.json` should limit output to `["dist"]`, so the only files that should appear are:

- `dist/**`
- `package.json` (always included by npm)
- `README.md` (always included by npm)
- `LICENSE` (if present)

If source files (`src/`, `scripts/`, etc.) appear in the pack output, that means `package.json` `files` field is misconfigured — flag it.

---

## Step 7 — Bump the version

Edit `package.json`: update `"version"` to the new version string.

---

## Step 8 — Report publish steps

Print this checklist for the user to follow:

```
Release checklist for @rspl/react-reusable-ui v<NEW_VERSION>
──────────────────────────────────────────────────────
✓  TypeScript — 0 errors
✓  Lint       — 0 errors
✓  Tests      — all passed
✓  Build      — dist/ verified
✓  Pack       — only dist/ files included
✓  Version    — package.json bumped to <NEW_VERSION>

Next steps (do these manually):
  1. git add package.json package-lock.json
  2. git commit -m "chore: release v<NEW_VERSION>"
  3. git tag v<NEW_VERSION>
  4. git push && git push --tags
  5. npm publish --access public

First-time publish reminder:
  Scoped packages require --access public on the first publish.
  Command: npm publish --access public
```

---

## Key file locations

| Purpose                | Path                    |
| ---------------------- | ----------------------- |
| Package metadata       | `package.json`          |
| Build config (library) | `vite.lib.config.ts`    |
| Build output           | `dist/`                 |
| Build command          | `npm run build`         |
| Test command           | `npm run test -- --run` |
