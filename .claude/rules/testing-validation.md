# Testing And Validation Rules

Validate the narrowest affected area first, then expand only if needed.

Preferred checks:

- Run targeted Vitest files for component changes.
- Run `npm run lint` for TypeScript or export changes.
- Run `npm run build` for package-surface or styling changes that affect emitted output.
- Run `npm pack` when the task touches packaging, exports, or publish readiness.

What to verify:

- Public imports still compile.
- Types are emitted for new public components or hooks.
- Tailwind-driven styles still resolve through the packaged stylesheet.
- Tests cover new behavior and regressions.

Do not claim success without stating:

- What validations were run.
- What was not run.
- Any residual risk, especially around exports, CSS packaging, or peer dependency behavior.
