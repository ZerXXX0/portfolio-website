# Portfolio Website

A Next.js + TailwindCSS portfolio backed by an Express API that serves both live GitHub data and manually curated CV content.

## Features
- Express API (`server/index.js`) proxies GitHub with Axios (`/github/profile`, `/github/repos`, `/github/top-repos`).
- GraphQL endpoint `/github/pinned-repos` mirrors your GitHub profile pins (requires `GITHUB_TOKEN`).
- Manual CV information (experience, skills, contact) lives in `data/profile.json` and is exposed via `/profile`.
- Frontend consumes the backend only, keeping access tokens on the server side.
- Top repositories, live language stats, and GitHub avatar are rendered in the React UI.
- Projects grid polls the API every 60 seconds so GitHub changes land on the site without redeploys.
- Graceful fallbacks keep the page functional if the API is briefly unreachable.

## Quick Start

```bash
npm install

# Terminal 1 – start the API
npm run server

# Terminal 2 – start the Next.js app
npm run dev
```

Open http://localhost:3000 after both processes are running. The frontend talks to `http://localhost:4000` by default.

## Environment Variables

Create a `.env` file in the project root for the backend:

```
PORT=4000
GITHUB_USERNAME=ZerXXX0
GITHUB_TOKEN=ghp_xxx   # optional but recommended for higher rate limits
```

Expose the API URL to Next.js via `.env.local` when deploying somewhere else (the `NEXT_PUBLIC_` value is required for the browser-side repo sync):

```
API_BASE_URL=https://your-api.example.com
NEXT_PUBLIC_API_BASE_URL=https://your-api.example.com
```

## Editing Manual CV Data
- Update `data/profile.json` to change your name, headline, skills, experience timeline, or contact links.
- The Express server reads this file on every request—no rebuilds or databases needed.

## Configuration
- Pinned repositories retrieved for fallback sections: edit `lib/site-config.ts` and add repo names to `pinnedRepos`.

## Deploy
Recommended approach:
1. Deploy the Express API (Azure App Service, Render, Fly.io, etc.) with the environment variables above.
2. Deploy the Next.js frontend (Vercel, Netlify, etc.) and set `API_BASE_URL`/`NEXT_PUBLIC_API_BASE_URL` to point at the API.

## Notes
- Endpoints served by the API: `/profile`, `/github/profile`, `/github/repos`, `/github/top-repos?limit=10`, `/github/pinned-repos?limit=10`.
- The frontend requests live GitHub data on every load (no ISR) to keep the CV fresh.
