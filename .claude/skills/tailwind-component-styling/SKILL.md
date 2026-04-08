# Skill: Tailwind Styling For Reusable Components

Use this skill for any UI change where styling, tokens, variants, or packaged CSS behavior matter.

## Styling workflow

1. Inspect the existing component classes and shared style tokens first.
2. Reuse patterns from similar components before inventing a new variant system.
3. Prefer token-backed utilities and class composition.
4. Keep states explicit: default, hover, focus-visible, disabled, invalid, open, selected.
5. Preserve package stylesheet compatibility.

## Rules

- Favor reusable class maps over repeated string fragments when variants grow.
- Use `className` merging when consumers need extension points.
- Do not introduce raw product colors if existing tokens cover the use case.
- Keep AG Grid and toast overrides isolated to their dedicated style files.
- Avoid styling that depends on the showcase page context.

## Validate

- Check the component visually in the showcase when practical.
- Run component tests if the styling change affects state or DOM structure.
- Run `npm run build` when shared CSS or public component output changes.
