const path = require("path")
const fs = require("fs/promises")
const express = require("express")
const cors = require("cors")
const axios = require("axios")
require("dotenv").config()

const PORT = process.env.PORT || 4000
const DEFAULT_USERNAME = "ZerXXX0"
const PROFILE_PATH = path.join(__dirname, "..", "data", "profile.json")

const app = express()
app.use(cors())
app.use(express.json())

const githubClient = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
    "User-Agent": "personal-cv-app",
  },
})

if (process.env.GITHUB_TOKEN) {
  githubClient.defaults.headers.common.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
}

const PINNED_GRAPHQL_QUERY = `
  query ($login: String!, $limit: Int!) {
    user(login: $login) {
      pinnedItems(first: $limit, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            owner {
              login
            }
          }
        }
      }
    }
  }
`

async function loadProfileFromDisk() {
  const raw = await fs.readFile(PROFILE_PATH, { encoding: "utf-8" })
  return JSON.parse(raw)
}

async function resolveUsername() {
  if (process.env.GITHUB_USERNAME) {
    return process.env.GITHUB_USERNAME
  }
  try {
    const profile = await loadProfileFromDisk()
    if (profile?.githubUsername) {
      return profile.githubUsername
    }
  } catch (error) {
    console.warn("Unable to derive username from profile.json", error.message)
  }
  return DEFAULT_USERNAME
}

async function fetchGithubProfile(username) {
  const { data } = await githubClient.get(`/users/${encodeURIComponent(username)}`)
  return data
}

async function fetchGithubRepos(username) {
  const { data } = await githubClient.get(`/users/${encodeURIComponent(username)}/repos`, {
    params: { per_page: 100, sort: "updated" },
  })
  return data
}

function selectRecentRepos(repos, limit) {
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

async function fetchPinnedRepoFullNames(username, limit) {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN is required to fetch pinned repositories")
  }

  const { data } = await githubClient.post("/graphql", {
    query: PINNED_GRAPHQL_QUERY,
    variables: { login: username, limit },
  })

  if (data?.errors?.length) {
    const message = data.errors.map((err) => err.message).join("; ")
    throw new Error(`GitHub GraphQL error: ${message}`)
  }

  const nodes = data?.data?.user?.pinnedItems?.nodes || []
  return nodes
    .map((node) => {
      if (!node?.name) return null
      const ownerLogin = node.owner?.login || username
      return `${ownerLogin}/${node.name}`
    })
    .filter(Boolean)
}

function handleApiError(res, error) {
  if (axios.isAxiosError(error) && error.response) {
    console.error("GitHub API error", error.response.status, error.response.data)
    return res.status(error.response.status).json({
      message: error.response.data?.message || "GitHub API request failed",
    })
  }
  console.error("Unexpected server error", error)
  return res.status(500).json({ message: "Internal server error" })
}

app.get("/profile", async (req, res) => {
  try {
    const profile = await loadProfileFromDisk()
    res.json(profile)
  } catch (error) {
    console.error("Failed to read profile.json", error)
    res.status(500).json({ message: "Unable to load profile data" })
  }
})

app.get("/github/profile", async (req, res) => {
  try {
    const username = req.query.username || (await resolveUsername())
    const profile = await fetchGithubProfile(username)
    res.json(profile)
  } catch (error) {
    handleApiError(res, error)
  }
})

app.get("/github/repos", async (req, res) => {
  try {
    const username = req.query.username || (await resolveUsername())
    const repos = await fetchGithubRepos(username)
    res.json(repos)
  } catch (error) {
    handleApiError(res, error)
  }
})

app.get("/github/top-repos", async (req, res) => {
  try {
    const username = req.query.username || (await resolveUsername())
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50)
    const repos = await fetchGithubRepos(username)
    const topRepos = selectRecentRepos(repos, limit)

    res.json(topRepos)
  } catch (error) {
    handleApiError(res, error)
  }
})

app.get("/github/pinned-repos", async (req, res) => {
  try {
    const username = req.query.username || (await resolveUsername())
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50)
    const repos = await fetchGithubRepos(username)

    let orderedPinned = []
    if (process.env.GITHUB_TOKEN) {
      try {
        const pinnedFullNames = await fetchPinnedRepoFullNames(username, limit)
        const normalizedLookup = new Map(repos.map((repo) => [repo.full_name.toLowerCase(), repo]))
        orderedPinned = pinnedFullNames
          .map((fullName) => normalizedLookup.get(fullName.toLowerCase()))
          .filter(Boolean)
          .slice(0, limit)
      } catch (graphqlError) {
        console.warn("Falling back to recent repos after GraphQL pinned fetch failed", graphqlError.message)
      }
    } else {
      console.warn("GITHUB_TOKEN missing – falling back to recent repositories instead of pinned list")
    }

    if (!orderedPinned.length) {
      orderedPinned = selectRecentRepos(repos, limit)
    }

    res.json(orderedPinned)
  } catch (error) {
    handleApiError(res, error)
  }
})

app.listen(PORT, () => {
  console.log(`CV API server listening on port ${PORT}`)
})

module.exports = app
