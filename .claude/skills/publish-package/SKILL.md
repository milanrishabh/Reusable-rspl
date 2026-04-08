# Skill: Prepare Or Publish npm Package

Use this skill when checking package readiness, creating a release, or publishing `@rspl/react-reusable-ui`.

## Release workflow

1. Confirm the intended version in `package.json`.
2. Run `npm run build`.
3. Run `npm pack`.
4. Inspect the tarball contents if packaging changed.
5. Confirm README instructions still match actual package behavior.
6. Publish with the correct npm command for the release type.

## Publish rules

- First public publish for this scoped package: `npm publish --access public`
- Later publishes: `npm publish`
- Keep `private: false`
- Ensure `dist/` contains the expected JS, CJS, declaration files, and `style.css`

## Pre-publish checks

- Public imports work from the barrel and required subpaths.
- `@rspl/react-reusable-ui/style.css` remains valid.
- Peer dependency expectations are still documented.
- No local-only showcase code leaked into the package surface.
