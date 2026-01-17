import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Contact } from "@/components/contact"
import { Experience } from "@/components/experience"
import { Education } from "@/components/education"
import { Achievements } from "@/components/achievements"
import { PortfolioLinks } from "@/components/portfolio-links"
import { aggregateLanguages, selectFeaturedRepos, withOwnerNames } from "@/lib/github"
import { pinnedRepos } from "@/lib/site-config"
import { PROJECTS_DISPLAY_LIMIT } from "@/lib/constants"
import type { ManualProfile, SkillCategory } from "@/lib/profile"
import type { GitHubRepo, GitHubUser } from "@/lib/github"

// Import services directly for server-side rendering
import { loadManualProfile } from "@/server/profile-service"
import { fetchGithubProfile, fetchGithubRepos, fetchPinnedRepoFullNames, selectRecentRepos } from "@/server/github-service"

export const dynamic = "force-dynamic"
export const revalidate = 0

const fallbackProfile: ManualProfile = {
  name: "Ghozy Hernandez",
  headline: "Computer Science Student & AI Engineer",
  summary:
    "Computer Science undergraduate focused on deploying AI solutions that improve safety, accessibility, and productivity.",
  githubUsername: "ZerXXX0",
  experience: [],
  skills: [],
  contact: {
    email: "ghozyhernandez@gmail.com",
    location: "Bandung, Indonesia",
    github: "https://github.com/ZerXXX0",
    instagram: "https://instagram.com/zerx_photo",
  },
}

function mergeSkillCategories(manualCategories: SkillCategory[] = [], languages: { name: string; level: number }[]) {
  if (!languages.length) return manualCategories
  const languageCategory: SkillCategory = {
    title: "Live GitHub Languages",
    skills: languages,
  }
  return [languageCategory, ...manualCategories]
}

export default async function Home() {
  let manualProfile: ManualProfile = fallbackProfile
  try {
    manualProfile = await loadManualProfile()
  } catch (error) {
    console.error("Failed to load manual CV profile", error)
  }

  let githubProfile: GitHubUser | null = null
  let repos: GitHubRepo[] = []
  let pinnedReposFromApi: GitHubRepo[] = []
  
  try {
    // Fetch GitHub data directly from services
    const [ghProfile, ghRepos] = await Promise.all([
      fetchGithubProfile(),
      fetchGithubRepos(),
    ])
    githubProfile = ghProfile
    repos = ghRepos
    
    // Get pinned repos
    try {
      const pinnedFullNames = await fetchPinnedRepoFullNames(undefined, PROJECTS_DISPLAY_LIMIT)
      if (pinnedFullNames.length) {
        const lookup = new Map(repos.map((repo) => [repo.full_name.toLowerCase(), repo]))
        pinnedReposFromApi = pinnedFullNames
          .map((fullName) => lookup.get(fullName.toLowerCase()))
          .filter((repo): repo is GitHubRepo => repo !== undefined)
          .slice(0, PROJECTS_DISPLAY_LIMIT)
      }
    } catch (pinnedError) {
      console.warn("Failed to fetch pinned repos, using recent repos", pinnedError)
    }
    
    // Fallback to recent repos if no pinned repos
    if (!pinnedReposFromApi.length) {
      pinnedReposFromApi = selectRecentRepos(repos, PROJECTS_DISPLAY_LIMIT)
    }
  } catch (error) {
    console.error("Failed to load GitHub data", error)
  }

  const reposWithOwner = withOwnerNames(repos)
  const featured = selectFeaturedRepos(reposWithOwner, PROJECTS_DISPLAY_LIMIT, pinnedRepos)
  const languages = aggregateLanguages(reposWithOwner, 8)
  const skills = mergeSkillCategories(manualProfile.skills, languages)
  const projectRepos = pinnedReposFromApi.length ? pinnedReposFromApi : featured

  const heroName =
    manualProfile.name || githubProfile?.name || githubProfile?.login || manualProfile.githubUsername || "Portfolio"
  const githubUrl = manualProfile.contact.github || githubProfile?.html_url || "https://github.com/ZerXXX0"

  return (
    <main className="min-h-screen">
      <Hero
        name={heroName}
        bio={githubProfile?.bio || manualProfile.summary}
        avatarUrl={githubProfile?.avatar_url}
        githubUrl={githubUrl}
        instagramUrl={manualProfile.contact.instagram}
        email={manualProfile.contact.email}
        headline={manualProfile.headline}
      />
      <About
        bio={githubProfile?.bio ?? undefined}
        company={githubProfile?.company ?? undefined}
        summary={manualProfile.summary}
        headline={manualProfile.headline}
        location={manualProfile.contact.location || githubProfile?.location || undefined}
        stats={{
          followers: githubProfile?.followers,
          following: githubProfile?.following,
          publicRepos: githubProfile?.public_repos,
        }}
      />
      <Experience experiences={manualProfile.experience} />
      <Education education={manualProfile.education} />
      <Achievements achievements={manualProfile.achievements} />
      <Projects repos={projectRepos} />
      <Skills skillCategories={skills} />
      <PortfolioLinks links={manualProfile.portfolio} />
      <Contact contact={manualProfile.contact} />
    </main>
  )
}
