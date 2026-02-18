import { NextRequest, NextResponse } from "next/server"
import { fetchGithubRepos } from "@/server/github-service"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const username = searchParams.get("username") || undefined
    const repos = await fetchGithubRepos(username)
    return NextResponse.json(repos)
  } catch (error) {
    return NextResponse.json({ message: "Failed to load GitHub repositories" }, { status: 500 })
  }
}
