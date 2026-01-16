import { NextResponse } from "next/server"
import { fetchGithubProfile } from "@/server/github-service"

export const runtime = "nodejs"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get("username") || undefined
    const profile = await fetchGithubProfile(username)
    return NextResponse.json(profile)
  } catch (error) {
    console.error("GitHub profile API error", error)
    return NextResponse.json({ message: "Failed to load GitHub profile" }, { status: 500 })
  }
}
