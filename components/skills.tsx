import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { SkillCategory } from "@/lib/profile"

type SkillsProps = {
  skillCategories?: SkillCategory[]
}

const SKILL_ICONS: Record<string, string> = {
  // Programming Languages
  "python": "python",
  "sql": "postgresql",
  "java": "openjdk",
  "javascript": "javascript",
  "typescript": "typescript",
  "go": "go",
  "php": "php",
  "dart": "dart",
  "c++": "cplusplus",
  "c#": "csharp",
  "c/c++": "cplusplus",
  "html": "html5",
  "css": "css3",

  // AI / ML
  "pytorch": "pytorch",
  "tensorflow": "tensorflow",
  "keras": "keras",
  "opencv": "opencv",
  "scikit-learn": "scikitlearn",
  "huggingface": "huggingface",
  "hugging face": "huggingface",
  "ultralytics": "github",
  "mediapipe": "google",
  "pandas": "pandas",
  "numpy": "numpy",
  "scipy": "scipy",
  "jupyter notebook": "jupyter",

  // Generative AI
  "langchain": "chainlink",
  "openai": "openai",
  "gemini": "googlegemini",
  "ollama": "ollama",

  // Backend
  "fastapi": "fastapi",
  "flask": "flask",
  "django": "django",
  "node.js": "nodedotjs",
  "express": "express",
  "laravel": "laravel",
  ".net": "dotnet",

  // Databases
  "postgresql": "postgresql",
  "mysql": "mysql",
  "supabase": "supabase",
  "firebase": "firebase",
  "sqlite": "sqlite",

  // Frontend & Mobile
  "react": "react",
  "next.js": "nextdotjs",
  "flutter": "flutter",
  "react native": "react",
  "tailwindcss": "tailwindcss",
  "bootstrap": "bootstrap",

  // DevOps & Tools
  "git": "git",
  "github actions": "githubactions",
  "docker": "docker",
  "linux": "linux",
  "jupyter": "jupyter",
  "google colab": "googlecolab",
  "kaggle": "kaggle",
  "figma": "figma",
}

function getIconSlug(name: string): string | null {
  const normalized = name.toLowerCase().trim()
  if (SKILL_ICONS[normalized]) return SKILL_ICONS[normalized]
  if (normalized.includes("pandas")) return "pandas"
  if (normalized.includes("numpy")) return "numpy"
  if (normalized.includes("scikit")) return "scikitlearn"
  if (normalized.includes("google colab")) return "googlecolab"
  if (normalized.includes("git")) return "git"
  if (normalized.includes("docker")) return "docker"
  if (normalized.includes("c#")) return "csharp"
  if (normalized.includes("transformers")) return "huggingface"
  if (normalized.includes(".net")) return "dot-net"
  return null
}

const fallbackCategories: SkillCategory[] = [
  {
    title: "AI and Machine Learning",
    skills: [
      { name: "TensorFlow", level: 85 },
      { name: "PyTorch", level: 80 },
      { name: "scikit-learn", level: 85 },
      { name: "OpenCV", level: 80 },
      { name: "Pandas", level: 90 },
      { name: "NumPy", level: 90 },
    ],
  },
  {
    title: "Web Development",
    skills: [
      { name: "Next.js", level: 80 },
      { name: "React", level: 80 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Node.js", level: 75 },
      { name: "Express", level: 70 },
    ],
  },
]

export function Skills({ skillCategories = [] }: SkillsProps) {
  const categories = skillCategories.length ? skillCategories : fallbackCategories

  return (
    <section id="skills" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 font-sans">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 group"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-center group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap justify-center gap-2">
                    {category.skills.map((skill, skillIndex) => {
                      const slug = getIconSlug(skill.name)
                      return (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="px-3 py-1.5 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-default flex items-center gap-1.5"
                        >
                          {slug && (
                            <img
                              src={`https://cdn.jsdelivr.net/npm/simple-icons/icons/${slug}.svg`}
                              alt=""
                              className="w-4 h-4 object-contain dark:invert"
                            />
                          )}
                          {skill.name}
                        </Badge>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
