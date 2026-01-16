import { createGithubClient } from "@/server/github-client"
import type { GitHubRepo, GitHubUser } from "@/lib/github"

const DEFAULT_USERNAME = process.env.GITHUB_USERNAME || "ZerXXX0"

const PINNED_REPOS_QUERY = `
  query ($login: String!, $limit: Int!) {
    user(login: $login) {
      pinnedItems(first: $limit, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            owner { login }
          }
        }
      }
    }
  }
`

export async function fetchGithubProfile(username = DEFAULT_USERNAME) {
  const client = createGithubClient()
  const { data } = await client.get<GitHubUser>(`/users/${encodeURIComponent(username)}`)
  return data
}

export async function fetchGithubRepos(username = DEFAULT_USERNAME) {
  const client = createGithubClient()
  const { data } = await client.get<GitHubRepo[]>(`/users/${encodeURIComponent(username)}/repos`, {
    params: { per_page: 100, sort: "updated" },
  })
  return data
}

export async function fetchPinnedRepoFullNames(username = DEFAULT_USERNAME, limit = 10) {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    return []
  }

  const client = createGithubClient()
  const { data } = await client.post<{ data?: any; errors?: { message: string }[] }>("/graphql", {
    query: PINNED_REPOS_QUERY,
    variables: { login: username, limit },
  })

  if (data.errors?.length) {
    throw new Error(data.errors.map((err) => err.message).join("; "))
  }

  return (data.data?.user?.pinnedItems?.nodes || [])
    .map((node: any) => {
      if (!node?.name) return null
      const ownerLogin = node.owner?.login || username
      return `${ownerLogin}/${node.name}`
    })
    .filter(Boolean)
}

export function selectRecentRepos(repos: GitHubRepo[], limit: number) {
  return repos
    .filter((repo) => !repo.fork && !repo.archived)
    .sort((a, b) => {
      const aTimestamp = new Date(a.pushed_at || a.updated_at || a.created_at || 0).getTime()
      const bTimestamp = new Date(b.pushed_at || b.updated_at || b.created_at || 0).getTime()
      if (bTimestamp !== aTimestamp) {
        return bTimestamp - aTimestamp
      }
      return b.stargazers_count - a.stargazers_count
    })
    .slice(0, limit)
}
