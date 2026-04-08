# npm Package Rules

Treat all public changes as npm package changes.

Package rules:

- Keep `package.json` metadata accurate.
- Preserve `main`, `module`, `types`, and `exports` integrity.
- Do not edit `dist/` by hand.
- Ensure published files still come only from `files: ["dist"]` unless the task explicitly changes packaging.
- Keep peer dependencies in `peerDependencies`, not regular dependencies, when the host app must provide them.

Subpath rules:

- Source of truth for library subpaths is `scripts/lib-subpaths-manifest.mjs`.
- After adding or renaming a public subpath, run `npm run gen:subpaths`.
- Verify generated `src/subpaths/*.ts` files and `package.json` exports are aligned.

Release rules:

- Any public API change requires checking docs, exports, and types together.
- Any publish-related task should validate build output with `npm run build` and preferably `npm pack`.
- First public publish for this scoped package requires `npm publish --access public`.

Consumer safety rules:

- Preserve stylesheet import compatibility.
- Keep deep-import paths kebab-case.
- Avoid breaking peer version ranges without a deliberate versioning decision.
