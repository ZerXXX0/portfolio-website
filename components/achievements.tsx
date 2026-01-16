import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { AchievementItem } from "@/lib/profile"
import { Trophy } from "lucide-react"

interface AchievementsProps {
  achievements?: AchievementItem[]
}

export function Achievements({ achievements = [] }: AchievementsProps) {
  if (!achievements.length) return null

  return (
    <section id="achievements" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 font-sans">Achievements</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {achievements.map((achievement, index) => (
              <Card
                key={`${achievement.event}-${index}`}
                className="border-t-4 border-primary/70 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <CardHeader className="flex items-start gap-3">
                  <Trophy className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <CardTitle className="text-xl">{achievement.title}</CardTitle>
                    {achievement.event ? (
                      <CardDescription className="text-base">{achievement.event}</CardDescription>
                    ) : null}
                    {achievement.year ? (
                      <p className="text-sm font-semibold text-muted-foreground">{achievement.year}</p>
                    ) : null}
                  </div>
                </CardHeader>
                {achievement.description ? (
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{achievement.description}</p>
                  </CardContent>
                ) : null}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
