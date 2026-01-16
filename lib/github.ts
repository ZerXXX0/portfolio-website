// Lightweight GitHub API helpers for server-side fetching in Next.js
// Reads optional GITHUB_TOKEN to increase rate limits.

export interface GitHubUser {
  login: string
  name?: string
  bio?: string
  avatar_url?: string
  company?: string
  blog?: string
  email?: string | null
  location?: string | null
  twitter_username?: string | null
  followers?: number
  following?: number
  public_repos?: number
  html_url: string
}

export interface GitHubRepo {
  name: string
  full_name: string
  description?: string | null
  language?: string | null
  stargazers_count: number
  forks_count: number
  html_url: string
  homepage?: string | null
  topics?: string[]
  archived: boolean
  fork: boolean
  created_at?: string
  pushed_at?: string
  updated_at?: string
  ownerName?: string
}

export interface LanguageStat {
  name: string
  level: number // 0-100 as percentage derived from repo frequency
}

export function selectFeaturedRepos(repos: GitHubRepo[], max = 6, pinned: string[] = []): GitHubRepo[] {
  const filtered = repos.filter((r) => !r.fork && !r.archived)
  // Sort: pinned first, then by stars, then recent activity
  const sorted = filtered.sort((a, b) => {
    const aPinned = pinned.includes(a.name)
    const bPinned = pinned.includes(b.name)
    if (aPinned !== bPinned) return bPinned ? 1 : -1
    if (b.stargazers_count !== a.stargazers_count) {
      return b.stargazers_count - a.stargazers_count
    }
    const ap = Date.parse(a.pushed_at || a.updated_at || "1970-01-01")
    const bp = Date.parse(b.pushed_at || b.updated_at || "1970-01-01")
    return bp - ap
  })
  return sorted.slice(0, max)
}

export function aggregateLanguages(repos: GitHubRepo[], max = 8): LanguageStat[] {
  const counts = new Map<string, number>()
  for (const r of repos) {
    const lang = (r.language || "").trim()
    if (!lang) continue
    counts.set(lang, (counts.get(lang) || 0) + 1)
  }
  const total = Array.from(counts.values()).reduce((a, b) => a + b, 0)
  const stats: LanguageStat[] = Array.from(counts.entries())
    .map(([name, count]) => ({ name, level: total ? Math.round((count / total) * 100) : 0 }))
    .sort((a, b) => b.level - a.level)
    .slice(0, max)
  return stats
}

// Utility to safely derive owner name from full_name
function ownerNameFromFullName(fullName?: string): string | undefined {
  if (!fullName) return undefined
  const idx = fullName.indexOf("/")
  if (idx === -1) return undefined
  return fullName.slice(0, idx)
}

export function withOwnerNames(repos: GitHubRepo[]): GitHubRepo[] {
  return repos.map((r) => ({ ...r, ownerName: ownerNameFromFullName(r.full_name) }))
}
