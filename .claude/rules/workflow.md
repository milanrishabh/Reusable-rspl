# Workflow Rules

Follow this sequence before editing:

1. Identify whether the task affects the library, the showcase app, or both.
2. Read the component, its tests, `src/index.ts`, and any related `src/subpaths/*.ts` file before changing public UI code.
3. If the task changes package surface area, inspect `package.json`, `scripts/lib-subpaths-manifest.mjs`, and generated subpaths first.
4. Prefer minimal diffs that preserve existing behavior and import paths.
5. Run only the smallest useful validation first, then broader validation if the change touches shared behavior.

Required assumptions:

- `src/components/ui/` contains the library components.
- `src/playground/showcase/` is local documentation and manual verification only.
- `dist/` is generated output and should not be edited by hand.

Do not:

- Do not introduce breaking API changes silently.
- Do not move files or rename exports unless the task explicitly requires it.
- Do not edit generated build output directly.
- Do not add dependencies without clear package-level justification.
