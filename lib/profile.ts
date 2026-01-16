export interface SkillMetric {
  name: string
  level: number
}

export interface SkillCategory {
  title: string
  skills: SkillMetric[]
}

export interface ExperienceItem {
  role: string
  company: string
  period: string
  description: string
  highlights?: string[]
}

export interface EducationItem {
  school: string
  degree?: string
  period?: string
  description?: string
}

export interface AchievementItem {
  title: string
  event?: string
  year?: string
  description?: string
}

export interface PortfolioLink {
  label: string
  url: string
  description?: string
}

export interface ContactInfo {
  email?: string
  location?: string
  github?: string
  instagram?: string
  website?: string
}

export interface ManualProfile {
  name?: string
  headline?: string
  summary?: string
  githubUsername?: string
  experience: ExperienceItem[]
  skills: SkillCategory[]
  education?: EducationItem[]
  achievements?: AchievementItem[]
  portfolio?: PortfolioLink[]
  contact: ContactInfo
}
