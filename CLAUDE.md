## Claude Operating Guide

This repository is a React component library published as `@rspl/react-reusable-ui`.

Before making changes, read the relevant files in `.claude/rules/` and `.claude/skills/`.

### Required baseline reads

- Read `.claude/rules/workflow.md`
- Read `.claude/rules/coding-standards.md`
- Read `.claude/rules/react-library.md`
- Read `.claude/rules/tailwind-library.md`
- Read `.claude/rules/npm-package.md`
- Read `.claude/rules/testing-validation.md`

### Task routing

- For new component work, read `.claude/skills/create-component.md`
- For export or package-surface changes, read `.claude/skills/manage-exports.md`
- For release or npm publish work, read `.claude/skills/publish-package.md`
- For styling-heavy work, read `.claude/skills/tailwind-component-styling.md`
- For bugfix or refactor work, read `.claude/skills/component-maintenance.md`

### Non-negotiables

- Treat this repo as a reusable npm package first, showcase app second.
- Preserve public API stability unless the task explicitly allows breaking changes.
- Keep React components typed, composable, and tree-shake friendly.
- Keep Tailwind styles token-driven and reusable.
- Update tests, exports, and docs when a public component changes.
