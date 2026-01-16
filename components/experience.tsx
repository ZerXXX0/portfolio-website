import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ExperienceItem } from "@/lib/profile"
import { Briefcase } from "lucide-react"

interface ExperienceProps {
  experiences?: ExperienceItem[]
}

export function Experience({ experiences = [] }: ExperienceProps) {
  if (!experiences.length) return null

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 font-sans">Experience</h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card
                key={`${exp.company}-${index}`}
                className="border-l-4 border-primary/80 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      <CardTitle className="text-2xl font-semibold">{exp.role}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {exp.company}
                      {exp.period ? ` • ${exp.period}` : null}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed text-base text-foreground/80">{exp.description}</p>
                  {exp.highlights?.length ? (
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {exp.highlights.map((highlight, highlightIndex) => (
                        <li key={highlightIndex}>{highlight}</li>
                      ))}
                    </ul>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
