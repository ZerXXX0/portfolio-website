import type { ManualProfile } from "@/lib/profile"
import type { GitHubRepo, GitHubUser } from "@/lib/github"

function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Client-side: use relative URLs
    return ""
  }
  // Server-side: construct absolute URL
  const vercelUrl = process.env.VERCEL_URL
  if (vercelUrl) {
    return `https://${vercelUrl}`
  }
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
}

async function fetchFromApi<T>(path: string): Promise<T> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  const base = getBaseUrl()
  const target = `${base}${normalizedPath}`

  const res = await fetch(target, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  })

  if (!res.ok) {
    const message = await res.text()
    throw new Error(`API request failed (${res.status}): ${message || normalizedPath}`)
  }

  return (await res.json()) as T
}

export function getManualProfile() {
  return fetchFromApi<ManualProfile>("/api/profile")
}

export function getGithubProfile() {
  return fetchFromApi<GitHubUser>("/api/github/profile")
}

export function getGithubRepos() {
  return fetchFromApi<GitHubRepo[]>("/api/github/repos")
}

export function getTopRepos(limit = 5) {
  const search = new URLSearchParams({ limit: String(limit) })
  return fetchFromApi<GitHubRepo[]>(`/api/github/top-repos?${search.toString()}`)
}

export function getPinnedRepos(limit = 10) {
  const search = new URLSearchParams({ limit: String(limit) })
  return fetchFromApi<GitHubRepo[]>(`/api/github/pinned-repos?${search.toString()}`)
}
