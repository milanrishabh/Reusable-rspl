# Skill: Manage Library Exports

Use this skill when adding, removing, or renaming anything that should be importable by package consumers.

## Source of truth

- `src/index.ts` for barrel exports
- `scripts/lib-subpaths-manifest.mjs` for deep-import entries
- generated `src/subpaths/*.ts`
- `package.json` `exports`

## Workflow

1. Decide whether the item belongs in the main barrel, a subpath, or both.
2. Update the implementation export in `src/index.ts` if it is part of the main API.
3. Update `scripts/lib-subpaths-manifest.mjs` for any deep import change.
4. Run `npm run gen:subpaths`.
5. Review generated subpath files and `package.json` export entries.
6. Build the library to confirm emitted JS and declaration files are generated correctly.

## Guardrails

- Use kebab-case for subpath names.
- Keep type paths aligned with emitted declaration file names.
- Do not hand-edit generated exports in multiple places when the manifest is the true source.
- Avoid exposing internal showcase utilities.
