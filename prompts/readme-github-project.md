# README refresh and GitHub project presentation

## Goal

Replace the tutorial marketing copy in the root README with a clear, first-person project README for the user's Vertex learning platform and publish the finished README change to the already configured GitHub repository.

## Skills and guidance read

- Repository `AGENTS.md`, including the required prompt-first approval workflow.
- User-provided request and repository context.

## Code and repository state inspected

- Root `README.md` includes JavaScript Mastery tutorial/channel/community/video-kit promotions, a third-party sample image, and a clone URL for `jsmastery-pro/vertex-learning-platform`.
- Root `package.json` and source files were not reviewed; scope is a README edit only.
- Git remote `origin` points to `https://github.com/Islembelmenigher/Learning-platform.git`.
- Current branch is `main`, tracking `origin/main`; the working tree was clean before creating this prompt.

## Decisions and assumptions

- Remove JavaScript Mastery branding, tutorial/video-kit links, promotional banners, and unrelated third-party sample images from the root README.
- Describe Vertex in first person as a project the user is building. Do not claim it was created entirely from scratch or make unsupported claims about authorship/provenance.
- Keep ordinary links to official technology documentation and shields.io badges where they explain the stack; the request targets JavaScript Mastery sources and tutorial promotion.
- Change the clone instructions to this repository's configured GitHub URL.
- Publish only the README refresh: stage the README, create a descriptive commit, and push the current `main` branch to `origin`. Do not force push or include unrelated files.

## Expected files

- `README.md`: rewrite tutorial-centric content into a concise project overview, accurate feature/stack summary, setup instructions, and personal project framing.
- `prompts/readme-github-project.md`: this implementation prompt.

## Requirements and safety

- Do not expose environment variables or credentials.
- Keep setup instructions consistent with the existing `.env.example` without opening or copying secret values.
- Use the configured remote and branch only. Review the staged diff before commit and verify the remote branch state before pushing; stop if it has diverged or contains unexpected changes.
- Do not remove source files/assets; only remove tutorial promotions and their README references.

## Acceptance criteria

- Root README contains no JavaScript Mastery/JSM references or unrelated third-party sample links/assets.
- README presents Vertex as the user's active project without false claims that it is wholly original.
- Clone/setup instructions point to the configured repository and accurately describe the local app at a high level.
- Only the intended README update is committed and pushed to `origin/main`.

## Checks

- Review the final README and search it for `javascript mastery`, `jsmastery`, and `JSM` references.
- Run `git diff --check` and review `git diff` before publishing.
- Confirm push result from Git; do not claim publication if the remote write fails.
- No app typecheck/build is required for documentation-only changes.

## Manual test steps

1. Open the root README on the GitHub repository and confirm the title, overview, features, setup commands, and links render correctly.
2. Follow the clone and local setup steps from a fresh checkout, supplying local credentials privately from the relevant provider dashboards.
