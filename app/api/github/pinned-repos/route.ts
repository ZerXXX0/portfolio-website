import { NextRequest, NextResponse } from "next/server"
import { fetchGithubRepos, fetchPinnedRepoFullNames, selectRecentRepos } from "@/server/github-service"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const username = searchParams.get("username") || undefined
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 10, 1), 50)

    const repos = await fetchGithubRepos(username)
    let pinnedRepos = []

    try {
      const pinnedFullNames = await fetchPinnedRepoFullNames(username, limit)
      if (pinnedFullNames.length) {
        const lookup = new Map(repos.map((repo) => [repo.full_name.toLowerCase(), repo]))
        pinnedRepos = pinnedFullNames
          .map((fullName: string) => lookup.get(fullName.toLowerCase()))
          .filter(Boolean)
          .slice(0, limit)
      }
    } catch (error) {
    }

    if (!pinnedRepos.length) {
      pinnedRepos = selectRecentRepos(repos, limit)
    }

    return NextResponse.json(pinnedRepos)
  } catch (error) {
    return NextResponse.json({ message: "Failed to load pinned repositories" }, { status: 500 })
  }
}
