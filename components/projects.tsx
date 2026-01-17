"use client"

import { useEffect, useMemo, useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GitFork, Github, Loader2, Star } from "lucide-react"
import { PROJECTS_DISPLAY_LIMIT, GITHUB_REPO_REFRESH_INTERVAL_MS } from "@/lib/constants"
import type { GitHubRepo } from "@/lib/github"

type ProjectsProps = {
  repos: GitHubRepo[]
}

const ERROR_HINT = "Unable to refresh projects from GitHub right now."

export function Projects({ repos }: ProjectsProps) {
  const [liveRepos, setLiveRepos] = useState<GitHubRepo[]>(repos)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    let currentController: AbortController | null = null

    const syncRepos = async () => {
      const apiBase = resolveApiBaseUrl()

      currentController?.abort()
      const controller = new AbortController()
      currentController = controller

      try {
        setIsRefreshing(true)
        const response = await fetch(`${apiBase}/github/pinned-repos?limit=${PROJECTS_DISPLAY_LIMIT}`, {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`GitHub sync failed (${response.status})`)
        }

        const data = (await response.json()) as GitHubRepo[]
        if (!active) return
        setLiveRepos(data)
        setLastUpdated(new Date())
        setErrorMessage(null)
      } catch (error) {
        if (!active) return
        if ((error as DOMException)?.name === "AbortError") return
        console.error("Unable to refresh GitHub repos", error)
        setErrorMessage(ERROR_HINT)
      } finally {
        if (active) {
          setIsRefreshing(false)
        }
      }
    }

    syncRepos()
    const intervalId = window.setInterval(syncRepos, GITHUB_REPO_REFRESH_INTERVAL_MS)

    return () => {
      active = false
      currentController?.abort()
      window.clearInterval(intervalId)
    }
  }, [])

  const displayedRepos = useMemo(() => {
    const hydrated = liveRepos.length ? liveRepos : repos
    return hydrated.slice(0, PROJECTS_DISPLAY_LIMIT)
  }, [liveRepos, repos])

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-10">
            <h2 className="text-4xl font-bold font-sans">Featured Projects</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {isRefreshing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Syncing with GitHub…</span>
                </>
              ) : lastUpdated ? (
                <span>Updated {formatDistanceToNow(lastUpdated, { addSuffix: true })}</span>
              ) : (
                <span>Live from GitHub</span>
              )}
            </div>
          </div>

          {errorMessage && (
            <div className="mb-6 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {errorMessage}
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedRepos.length === 0 ? (
              <Card className="md:col-span-2 lg:col-span-3 text-center py-12">
                <CardHeader>
                  <CardTitle>No repositories available</CardTitle>
                  <CardDescription className="text-base">
                    GitHub data could not be loaded right now. Please try again shortly.
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              displayedRepos.map((repo) => {
                const updatedTimestamp = repo.updated_at || repo.pushed_at || repo.created_at
                const relativeUpdated = updatedTimestamp
                  ? formatDistanceToNow(new Date(updatedTimestamp), { addSuffix: true })
                  : null

                return (
                  <Card
                    key={repo.full_name}
                    className="group hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 hover:border-primary/20 transition-all duration-500"
                  >
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={repo.full_name ? `https://opengraph.githubassets.com/1/${repo.full_name}` : "/placeholder.svg"}
                        alt={repo.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(event) => {
                          event.currentTarget.src = "/placeholder.svg"
                        }}
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                        {repo.name}
                      </CardTitle>
                      {repo.description && (
                        <CardDescription className="text-sm leading-relaxed">{repo.description}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 font-medium">
                            <Star className="h-4 w-4" />
                            {repo.stargazers_count.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1 font-medium">
                            <GitFork className="h-4 w-4" />
                            {repo.forks_count.toLocaleString()}
                          </span>
                        </div>
                        {relativeUpdated && <span>{relativeUpdated}</span>}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {repo.language && (
                          <Badge
                            key={repo.language}
                            variant="secondary"
                            className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                          >
                            {repo.language}
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="flex-1 bg-transparent hover:scale-105 hover:shadow-md hover:border-primary transition-all duration-300"
                        >
                          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        </Button>
                        {repo.homepage && repo.homepage.trim() !== "" && (
                          <Button
                            size="sm"
                            variant="secondary"
                            asChild
                            className="flex-1 hover:scale-105 hover:shadow-md transition-all duration-300"
                          >
                            <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                              Live
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function resolveApiBaseUrl(): string {
  // Use Next.js API routes - works both locally and in production
  return "/api"
}
