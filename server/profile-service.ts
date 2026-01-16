import fs from "fs/promises"
import path from "path"
import type { ManualProfile } from "@/lib/profile"

const PROFILE_PATH = path.join(process.cwd(), "data", "profile.json")

export async function loadManualProfile(): Promise<ManualProfile> {
  const raw = await fs.readFile(PROFILE_PATH, { encoding: "utf-8" })
  return JSON.parse(raw) as ManualProfile
}
