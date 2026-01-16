# Portfolio Website

A Next.js + TailwindCSS portfolio with built-in Route Handlers for manual CV data and live GitHub stats (an optional Express server is still included for standalone API hosting).

## Features
- Next.js Route Handlers (`/api/profile`, `/api/github/*`) serve manual CV data and proxy GitHub safely—works on Vercel out of the box.
- Optional Express API (`server/index.js`) remains available if you prefer deploying the backend separately (Docker image included).
- GraphQL-powered `/api/github/pinned-repos` mirrors your GitHub profile pins (requires `GITHUB_TOKEN`).
- Manual CV information (experience, skills, contact) lives in `data/profile.json` and is streamed directly by the API—no rebuilds.
- Frontend talks to the server only, keeping tokens out of the browser.
- Top repositories, live language stats, and GitHub avatar are rendered in the React UI.
- Projects grid polls the API every 60 seconds so GitHub changes land on the site without redeploys.
- Graceful fallbacks keep the page functional if the API is briefly unreachable.

## Quick Start

```bash
npm install
npm run dev
```

All API endpoints are served by Next.js itself, so a single `npm run dev` is enough. Visit http://localhost:3000.

Need a dedicated backend? `npm run server` still starts the standalone Express API, and you can point the frontend at it with `API_BASE_URL`/`NEXT_PUBLIC_API_BASE_URL`.

### Docker (single container)

```bash
docker build -t portfolio-app .
docker run --env-file .env -p 3000:3000 -p 4000:4000 portfolio-app
```

This launches Express on port 4000 (optional) and the compiled Next.js app on port 3000 inside the same container. Override `API_PORT`/`NEXT_PORT` if needed.

## Environment Variables

Create a `.env` (or `.env.local`) file for server-side secrets:

```
GITHUB_USERNAME=ZerXXX0
GITHUB_TOKEN=ghp_xxx   # optional but recommended for higher rate limits
```

Optionally point the frontend at an external API instead of the built-in Route Handlers:

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

- **Vercel (recommended):** add `GITHUB_USERNAME` and `GITHUB_TOKEN` to the Project → Environment Variables and deploy—Route Handlers provide `/api/profile` and `/api/github/*` automatically.
- **Separate backend:** deploy `server/index.js` (Render, Fly, etc.) and set `API_BASE_URL`/`NEXT_PUBLIC_API_BASE_URL` so the frontend targets that service.

## Notes
- Endpoints served by Next Route Handlers: `/api/profile`, `/api/github/profile`, `/api/github/repos`, `/api/github/top-repos?limit=10`, `/api/github/pinned-repos?limit=10`.
- The frontend requests live GitHub data on every load (no ISR) to keep the CV fresh.
