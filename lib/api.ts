import type { ManualProfile } from "@/lib/profile"
import type { GitHubRepo, GitHubUser } from "@/lib/github"

function getInternalSiteUrl() {
  if (typeof window !== "undefined") {
    return ""
  }
  const vercelUrl = process.env.VERCEL_URL
  if (vercelUrl) {
    return vercelUrl.startsWith("http") ? vercelUrl : `https://${vercelUrl}`
  }
  return process.env.INTERNAL_SITE_URL || "http://localhost:3000"
}

function getApiBaseUrl() {
  const envBase = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL
  if (envBase) {
    return envBase.endsWith("/") ? envBase.slice(0, -1) : envBase
  }
  return getInternalSiteUrl()
}

async function fetchFromApi<T>(path: string): Promise<T> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  const base = getApiBaseUrl()
  const target = base ? `${base}${normalizedPath}` : normalizedPath

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
