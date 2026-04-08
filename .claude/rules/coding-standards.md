# Coding Standards

Use these standards for every code change:

- Use TypeScript strictly. Do not introduce `any`.
- Prefer explicit exported prop types for public components.
- Keep file names and export names consistent with existing patterns.
- Prefer named exports unless the repo already uses a default export for that component.
- Keep imports ordered and avoid unused imports.
- Reuse utilities from `src/lib/` before adding new helpers.
- Keep components focused on one concern.
- Keep public props small, predictable, and documented through clear names.

React and TypeScript rules:

- Prefer controlled/uncontrolled APIs only when they are intentional and documented in code.
- Use discriminated unions or narrow prop types instead of loose option bags.
- Prefer composition over one-off boolean prop explosion.
- Preserve accessibility attributes and keyboard behavior.
- Avoid hidden side effects during render.

Library design rules:

- Default behavior must be safe for host apps.
- Avoid leaking showcase-specific concerns into the library.
- Do not hardcode product-specific copy unless required by the task.
- Avoid runtime-heavy abstractions for simple UI primitives.
