import type { ManualProfile } from "@/lib/profile"
import profileData from "@/data/profile.json"

export async function loadManualProfile(): Promise<ManualProfile> {
  return profileData as ManualProfile
}
