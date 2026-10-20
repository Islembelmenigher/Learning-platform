# Clerk setup implementation prompt

## Goal

Make the existing Clerk integration in this Next.js App Router project ready for local development, preserving its current Clerk application and SDK generation. The user accepted the Clerk setup checklist.

## Skills and guidance read

- `clerk` router skill and `clerk-setup` skill.
- Repository `AGENTS.md` requirements for server/client boundaries, prompt-first approval, and checks.
- Pasted Clerk setup instructions. These identify an already selected Clerk application (`app_3KxKA29xYAtMjYKxIFVsWFmMtw5`); do not create or select another application.

## Code inspected

- Root `package.json`: Next.js 16.3.1 and `@clerk/nextjs` 7.7.6 (current Clerk SDK generation).
- `proxy.ts`: uses `clerkMiddleware()` and matches application pages, API routes, and Clerk proxy routes.
- `app/layout.tsx`: `ClerkProvider` is inside `<body>` and wraps the application.
- `app/sign-in/[[...sign-in]]/page.tsx` and `app/sign-up/[[...sign-up]]/page.tsx`: prebuilt Clerk flows are present.
- `components/layout/site-header.tsx`: sign-in, sign-up, and user controls are present.
- `app/api/search/route.ts`: server-side Clerk `auth()` call is present.
- Clerk setup skill files are present in `.agents/skills`; do not install global skills unless the CLI explicitly identifies a missing required local capability.

Environment files, including `.env.example`, were not opened, printed, or inspected. Do not display or copy secrets.

## Decisions and assumptions

- This is an existing Clerk integration, not a fresh setup. Do not run `clerk init`.
- Preserve the selected existing Clerk application. Do not relink to another app, pull keys over working values, rotate keys, or create test users.
- Do not make speculative UI or auth-policy changes. Public browsing is intended by the project instructions.
- The implementation may conclude that no source edits are needed if the CLI check and local startup confirm the integration is healthy.

## Expected files and operations

- No application source edits are expected unless a concrete missing integration element is discovered and can be corrected without changing the selected Clerk app or auth policy.
- `prompts/clerk-setup.md` documents this approved scope.
- Run the Clerk CLI doctor check and start the existing Next.js development server. Do not run `init`, `auth login`, `link`, `env pull`, user creation, or deployment commands.

## Requirements and security

- Keep `CLERK_SECRET_KEY` server-only. Never read or print `.env*` contents.
- Keep current SDK generation and existing selected application.
- Maintain public catalog/page access and current route protection behavior unless the doctor identifies a concrete broken integration.
- Avoid network or account actions that change Clerk application state.

## Acceptance criteria

- Clerk doctor reports no integration issue requiring a source change, or any concrete source-level issue is repaired within the above constraints.
- The Next.js development server starts with Clerk installed; report exact output and whether user configuration is still required.
- Existing sign-in/sign-up routes, visible auth controls, and the selected application remain intact.

## Checks

- `npx -y clerk@latest doctor` (or the available local CLI equivalent), without printing environment file contents.
- Start the app using the existing `npm run dev` script. Do not claim browser rendering or sign-in was verified without actually doing so.
- No typecheck, lint, or build is needed if no code changes are made.

## Manual test steps

1. Run `npm run dev` from the repository root.
2. Open the local URL printed by Next.js and confirm the page renders.
3. Confirm the header shows signed-out sign-in/sign-up controls, or the signed-in user control when an authenticated session exists.
4. Open `/sign-in` and `/sign-up` and confirm the Clerk forms render.
5. Sign in with the user's own Clerk test account to confirm the profile control appears.
