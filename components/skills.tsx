import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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
          <h2 className="text-4xl font-bold text-center mb-12 font-sans">Skills & Expertise</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="hover:scale-105 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 group"
              >
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2 group/skill">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium group-hover/skill:text-primary transition-colors duration-200">
                          {skill.name}
                        </span>
                        <span className="text-muted-foreground group-hover/skill:text-primary/70 transition-colors duration-200">
                          {skill.level}%
                        </span>
                      </div>
                      <Progress
                        value={skill.level}
                        className="h-2 group-hover/skill:scale-105 transition-transform duration-300 [&>div]:group-hover/skill:shadow-sm [&>div]:group-hover/skill:shadow-primary/50"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
