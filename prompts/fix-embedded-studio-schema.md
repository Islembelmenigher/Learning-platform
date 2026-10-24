# Fix the Embedded Studio Schema

## Goal
Make the document types already registered in the standalone Studio visible in the embedded `/studio` route, especially Category, without duplicating schema definitions.

## Skills and guidance read
- Repository `AGENTS.md` workflow and architecture guidance.
- No additional skill is needed for this narrow schema wiring change.

## Code inspected
- `app/studio/[[...tool]]/page.tsx` mounts the root Sanity config.
- Root `sanity.config.ts` imports `schema` from `sanity/schemaTypes`.
- `sanity/schemaTypes/index.ts` currently registers no types.
- `sanity/structure.ts` uses `S.documentTypeListItems()`, so it will display registered document types automatically.
- `studio/schemaTypes/index.ts` registers course, lesson, instructor, category, and video document definitions.
- `studio/structure.ts` separately presents those document types in the standalone Studio.

## Decision and assumptions
The user is viewing the embedded `/studio` route and wants the missing document types there. Reuse the existing schema registry from `studio/schemaTypes` in the root schema entry point. This avoids copying schema definitions or changing the Studio UI. Keep the current root project/dataset environment configuration unchanged.

## Expected files
- `sanity/schemaTypes/index.ts` to reuse the populated Studio schema registry.
- `package.json` and the generated lockfile to align the root workspace's `@sanity/icons` with the icon subpath imports used by the shared schema.
- `prompts/fix-embedded-studio-schema.md` for this approved implementation workflow.

## Requirements and security
- Reuse the existing schema definitions; do not add or modify document fields.
- Keep the root workspace `@sanity/icons` version compatible with the Studio schema's existing icon imports.
- Do not change environment variables, dataset, tokens, content, routes, or the standalone Studio.
- Do not expose or add secrets.

## Acceptance criteria
- The embedded Studio registers course, lesson, instructor, category, and video types.
- Its existing document-type list shows Categories without changes to the structure configuration.
- Root app typecheck, lint, and production build pass.

## Checks
- From the repository root: `npm run typecheck`, `npm run lint`, and `npm run build`.

## Manual test
1. Start the web app with `npm run dev`.
2. Open `/studio`.
3. Confirm the Content navigation includes Courses, Lessons, Instructors, Categories, and Video.
4. Open Categories and confirm the existing category documents are listed.