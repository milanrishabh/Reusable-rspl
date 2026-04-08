# Tailwind Library Rules

This package ships reusable Tailwind-driven UI. Styling changes must behave well in consumer apps.

Styling rules:

- Prefer Tailwind utility classes over ad hoc CSS.
- Reuse existing tokens, variables, and class patterns from `src/styles/tailwind.css`.
- Keep component styling themeable through tokens and class composition.
- Avoid inline styles unless the value is dynamic and cannot be expressed safely with utilities.
- Do not add one-off colors or spacing scales without checking existing tokens first.

CSS boundary rules:

- Global CSS belongs only in shared library styles under `src/styles/`.
- Component-specific styling should stay mostly inside the component through class composition.
- Treat `src/styles/notification.css` and `src/styles/ag-grid-overrides.css` as special integration styles, not a place for general component CSS.
- Preserve compatibility with the package stylesheet import: `@rspl/react-reusable-ui/style.css`.

Reusable component rules:

- Support composability with `className` merging where the component pattern already allows it.
- Keep variants systematic; prefer shared maps or helper functions over duplicated class strings.
- Maintain accessible focus, disabled, hover, and error states.
- Do not rely on showcase-only layout wrappers for component appearance.
