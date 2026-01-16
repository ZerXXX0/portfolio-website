import { NextRequest, NextResponse } from "next/server"
import { fetchGithubRepos, selectRecentRepos } from "@/server/github-service"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const username = searchParams.get("username") || undefined
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 10, 1), 50)
    const repos = await fetchGithubRepos(username)
    const topRepos = selectRecentRepos(repos, limit)
    return NextResponse.json(topRepos)
  } catch (error) {
    console.error("GitHub top repos API error", error)
    return NextResponse.json({ message: "Failed to load featured repositories" }, { status: 500 })
  }
}
