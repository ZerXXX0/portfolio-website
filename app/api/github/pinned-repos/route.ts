import { NextResponse } from "next/server"
import { fetchGithubRepos, fetchPinnedRepoFullNames, selectRecentRepos } from "@/server/github-service"

export const runtime = "nodejs"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get("username") || undefined
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 10, 1), 50)

    const repos = await fetchGithubRepos(username)
    let pinnedRepos = []

    try {
      const pinnedFullNames = await fetchPinnedRepoFullNames(username, limit)
      if (pinnedFullNames.length) {
        const lookup = new Map(repos.map((repo) => [repo.full_name.toLowerCase(), repo]))
        pinnedRepos = pinnedFullNames
          .map((fullName) => lookup.get(fullName.toLowerCase()))
          .filter(Boolean)
          .slice(0, limit)
      }
    } catch (error) {
      console.warn("Pinned repo GraphQL fetch failed, falling back to recent repos", error)
    }

    if (!pinnedRepos.length) {
      pinnedRepos = selectRecentRepos(repos, limit)
    }

    return NextResponse.json(pinnedRepos)
  } catch (error) {
    console.error("GitHub pinned repos API error", error)
    return NextResponse.json({ message: "Failed to load pinned repositories" }, { status: 500 })
  }
}
