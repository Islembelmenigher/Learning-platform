# Vertex — AI-powered learning platform

Vertex is a learning platform I’m building to make course videos easier to explore. Learners can search lessons in natural language and jump to the moment where a topic is covered. Course content is managed in Sanity, with a separate Studio workspace and a Next.js web app.

## What it does

- Search course lessons and timestamped video moments.
- Browse courses, lessons, and instructor profiles.
- Play lessons on the site through the video provider’s embed.
- Track learner progress and resume position.
- Manage structured course content in Sanity Studio.
- Use Clerk for authentication and PostHog for product analytics.

## Tech stack

- [Next.js](https://nextjs.org/) and [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Sanity](https://www.sanity.io/)
- [Clerk](https://clerk.com/)
- [PostHog](https://posthog.com/)
- [Vercel AI SDK](https://ai-sdk.dev/)

## Getting started

### Requirements

- [Node.js](https://nodejs.org/) 20.9 or later
- npm
- Development credentials for the services configured by the project

### Clone and install

```bash
git clone https://github.com/Islembelmenigher/Learning-platform.git
cd Learning-platform
npm install
```

### Configure environment

Keep `.env.example` as a template. Copy it to `.env.local`, then replace each blank value with your own project credentials or settings. Do not put real credentials in `.env.example`, and do not commit `.env.local`.

```bash
cp .env.example .env.local
```

| Variable | What to enter |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | The Sanity project ID from the project's Sanity settings. This is public configuration. |
| `NEXT_PUBLIC_SANITY_DATASET` | The dataset name this app should read, such as your development dataset. This is public configuration. |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | The publishable key from Clerk Dashboard → **API keys**. Use the development key locally. It is designed to be exposed to the browser. |
| `CLERK_SECRET_KEY` | The secret key from the same Clerk API keys page. Keep it server-only; never add a `NEXT_PUBLIC_` prefix. |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | The sign-in route in this app. Keep `/sign-in` unless you change the route. |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | The sign-up route in this app. Keep `/sign-up` unless you change the route. |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | Where to send a user after sign-in when no return URL is set. `/` sends them to the home page. |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` | Where to send a user after sign-up when no return URL is set. `/` sends them to the home page. |
| `SANITY_API_READ_TOKEN` | A read-only Viewer API token from Sanity Manage → **API** → **Tokens**. Server-only; do not expose it to the browser. |
| `SANITY_CONTEXT_MCP_URL` | The endpoint URL for the Sanity Context MCP used by the search API. Use the URL supplied by your Sanity Context setup; keep it server-only. |
| `OPENAI_API_KEY` | An API key from your OpenAI platform account for the search integration. Server-only; do not expose or commit it. |

Values beginning with `NEXT_PUBLIC_` are included in the browser bundle, so only put public keys and non-secret settings in them. Keep all other credentials private. After editing `.env.local`, restart the development server for the changes to take effect.

### Run the web app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The Sanity Studio is a separate workspace in `studio/`. Follow its package scripts and environment example to run it locally.

## Project structure

```text
app/       Next.js routes and API handlers
components/ Shared interface components
lib/       Server and client utilities
studio/    Sanity Studio workspace
```

## Development checks

```bash
npm run typecheck
npm run lint
npm run build
```
