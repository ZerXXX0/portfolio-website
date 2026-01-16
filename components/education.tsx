import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { EducationItem } from "@/lib/profile"
import { GraduationCap } from "lucide-react"

interface EducationProps {
  education?: EducationItem[]
}

export function Education({ education = [] }: EducationProps) {
  if (!education.length) return null

  return (
    <section id="education" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 font-sans">Education</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {education.map((school) => (
              <Card key={`${school.school}-${school.period}`} className="h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-6 h-6 text-primary" />
                    <div>
                      <CardTitle className="text-xl">{school.school}</CardTitle>
                      {school.degree ? (
                        <CardDescription className="text-base">{school.degree}</CardDescription>
                      ) : null}
                    </div>
                  </div>
                  {school.period ? (
                    <span className="text-sm font-semibold text-muted-foreground">{school.period}</span>
                  ) : null}
                </CardHeader>
                <CardContent>
                  {school.description ? (
                    <p className="text-sm leading-relaxed text-muted-foreground">{school.description}</p>
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
