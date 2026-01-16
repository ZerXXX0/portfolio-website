import { NextResponse } from "next/server"
import { fetchGithubRepos } from "@/server/github-service"

export const runtime = "nodejs"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get("username") || undefined
    const repos = await fetchGithubRepos(username)
    return NextResponse.json(repos)
  } catch (error) {
    console.error("GitHub repos API error", error)
    return NextResponse.json({ message: "Failed to load GitHub repositories" }, { status: 500 })
  }
}
