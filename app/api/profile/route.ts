import { NextResponse } from "next/server"
import { loadManualProfile } from "@/server/profile-service"

export const runtime = "nodejs"

export async function GET() {
  try {
    const profile = await loadManualProfile()
    return NextResponse.json(profile)
  } catch (error) {
    console.error("Failed to load manual profile", error)
    return NextResponse.json({ message: "Unable to load profile data" }, { status: 500 })
  }
}
