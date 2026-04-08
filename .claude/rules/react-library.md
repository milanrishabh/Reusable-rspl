# React Library Rules

This repo is a reusable React 19 library. Optimize for package consumers.

Component rules:

- Keep components in `src/components/ui/` unless they are cross-cutting non-UI helpers.
- Export public component props and important supporting types.
- Preserve stable refs and DOM semantics when adding wrappers.
- Use `forwardRef` when the component is an input-like primitive or a wrapper around a focusable element.
- Keep rendering predictable and side effects inside hooks.

API rules:

- Keep public API consistent between `src/index.ts`, `src/subpaths/*.ts`, and `package.json` exports.
- If a component is public, ensure the import works from both the barrel and the intended subpath when applicable.
- If you add a new public entry, update the subpath manifest and regenerate exports instead of hand-editing scattered files.

Testing rules:

- Add or update tests for behavior, not implementation details.
- Cover accessibility-critical interactions for form and overlay components.
- Prefer React Testing Library patterns already used in this repo.

Performance rules:

- Avoid unnecessary state and effects.
- Preserve tree-shakeable imports and avoid central registries that pull in unrelated components.
- Keep optional peer integrations optional.
