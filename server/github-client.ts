import axios, { AxiosInstance } from "axios"

const DEFAULT_HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "personal-cv-app",
}

function getTokenHeader() {
  const token = process.env.GITHUB_TOKEN
  if (!token) return {}
  return { Authorization: `Bearer ${token}` }
}

export function createGithubClient(): AxiosInstance {
  return axios.create({
    baseURL: "https://api.github.com",
    headers: { ...DEFAULT_HEADERS, ...getTokenHeader() },
  })
}
