# README environment setup guide

## Goal

Expand the root README's environment setup section so developers know how to create `.env.local` from `.env.example` and what value belongs in each variable.

## Skills and guidance read

- Repository `AGENTS.md` prompt-first approval requirements and environment-key handling guidance.
- Existing `README.md` and `.env.example` (the latter contains empty placeholders and public redirect paths only; no secret values were read).

## Inspected project details

`.env.example` defines:

- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
- `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL`
- `SANITY_API_READ_TOKEN`
- `SANITY_CONTEXT_MCP_URL`
- `OPENAI_API_KEY`

The working tree was clean at inspection. Current `main` is in sync with `origin/main`.

## Decisions and assumptions

- Keep `.env.example` as a placeholder template. Developers copy it to `.env.local` and put their own credentials in `.env.local`, not into the committed example.
- Explain each variable's purpose, where to find it, and whether it is browser-visible or server-only.
- Keep values blank in the example except the existing local redirect paths; never include real credentials or fake-looking credential strings.
- Explain that `NEXT_PUBLIC_*` values are public/browser-safe configuration, and `CLERK_SECRET_KEY`, `SANITY_API_READ_TOKEN`, `SANITY_CONTEXT_MCP_URL`, and `OPENAI_API_KEY` must remain server-side.

## Expected files

- `README.md`: add a concise variable-by-variable setup guide under the existing environment configuration section.
- `prompts/readme-env-setup.md`: this approved implementation prompt.

## Requirements and safety

- Do not add credentials to tracked files.
- Do not edit `.env.example` or any actual environment file.
- Do not change application code or configuration.
- Preserve the README's personal project framing and current GitHub clone URL.

## Acceptance criteria

- A reader can determine how to copy the example and populate each variable from the correct provider or project settings.
- Secret variables are clearly labeled server-only, with a warning not to commit them or prefix them with `NEXT_PUBLIC_`.
- Redirect path values are explained as local route paths and can usually remain as shown.

## Checks

- Review the README section for clarity and ensure every variable in `.env.example` is explained.
- Run `git diff --check` and verify no credential values were introduced.
- No application typecheck/build is needed for documentation-only changes.

## Manual test steps

1. Follow the README instruction to copy `.env.example` to `.env.local`.
2. Use the descriptions to locate and fill each service setting in `.env.local`.
3. Keep `.env.local` untracked and restart the app after changing values.
