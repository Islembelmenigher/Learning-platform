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

Copy `.env.example` to `.env.local` and fill in the values from the relevant service dashboards. Keep secret keys private and do not commit `.env.local`.

```bash
cp .env.example .env.local
```

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
