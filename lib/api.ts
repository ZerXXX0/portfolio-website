import type { ManualProfile } from "@/lib/profile"
import type { GitHubRepo, GitHubUser } from "@/lib/github"

function getApiBaseUrl() {
  const base = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000"
  return base.endsWith("/") ? base.slice(0, -1) : base
}

async function fetchFromApi<T>(path: string): Promise<T> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  const res = await fetch(`${getApiBaseUrl()}${normalizedPath}`, {
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
  return fetchFromApi<ManualProfile>("/profile")
}

export function getGithubProfile() {
  return fetchFromApi<GitHubUser>("/github/profile")
}

export function getGithubRepos() {
  return fetchFromApi<GitHubRepo[]>("/github/repos")
}

export function getTopRepos(limit = 5) {
  const search = new URLSearchParams({ limit: String(limit) })
  return fetchFromApi<GitHubRepo[]>(`/github/top-repos?${search.toString()}`)
}

export function getPinnedRepos(limit = 10) {
  const search = new URLSearchParams({ limit: String(limit) })
  return fetchFromApi<GitHubRepo[]>(`/github/pinned-repos?${search.toString()}`)
}
