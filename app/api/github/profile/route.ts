import { NextRequest, NextResponse } from "next/server"
import { fetchGithubProfile } from "@/server/github-service"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const username = searchParams.get("username") || undefined
    const profile = await fetchGithubProfile(username)
    return NextResponse.json(profile)
  } catch (error) {
    console.error("GitHub profile API error", error)
    return NextResponse.json({ message: "Failed to load GitHub profile" }, { status: 500 })
  }
}
