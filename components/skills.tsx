import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { SkillCategory } from "@/lib/profile"

type SkillsProps = {
  skillCategories?: SkillCategory[]
}

const fallbackCategories: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    skills: [
      { name: "TensorFlow", level: 85 },
      { name: "PyTorch", level: 80 },
      { name: "scikit-learn", level: 85 },
      { name: "OpenCV", level: 80 },
      { name: "Pandas & NumPy", level: 90 },
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
                    {category.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="px-3 py-1.5 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-default"
                      >
                        {skill.name}
                      </Badge>
                    ))}
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
