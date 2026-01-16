import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Camera, Code, Brain } from "lucide-react"

type AboutProps = {
  bio?: string
  company?: string
  summary?: string
  headline?: string
  location?: string
  stats?: {
    followers?: number
    following?: number
    publicRepos?: number
  }
}

export function About({ bio, company, summary, headline, location, stats }: AboutProps) {
  return (
    <section id="about" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 font-sans">About Me</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <p className="text-lg leading-relaxed mb-6">
                {summary ||
                  bio ||
                  "I'm a driven Computer Science undergraduate at Telkom University with a passion for Artificial Intelligence and Software Development. I specialize in building AI-powered solutions that make a real impact."}
              </p>
              <p className="text-lg leading-relaxed">
                {company
                  ? `Currently at ${company}, working across computer vision, NLP, and full-stack development to bring ideas to life.`
                  : "My work spans from computer vision systems for traffic safety to medical diagnostic tools. As a freelance designer and photography enthusiast, I bring a creative perspective to technical challenges."}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                {headline ? (
                  <div>
                    <p className="text-muted-foreground uppercase tracking-wide">Focus</p>
                    <p className="font-semibold">{headline}</p>
                  </div>
                ) : null}
                {location ? (
                  <div>
                    <p className="text-muted-foreground uppercase tracking-wide">Location</p>
                    <p className="font-semibold">{location}</p>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center p-6 hover:scale-105 hover:shadow-lg hover:shadow-secondary/20 hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-0">
                  <GraduationCap className="w-8 h-8 mx-auto mb-3 text-secondary group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                  <h3 className="font-semibold mb-1">Education</h3>
                  <p className="text-sm text-muted-foreground">Telkom University</p>
                </CardContent>
              </Card>
              <Card className="text-center p-6 hover:scale-105 hover:shadow-lg hover:shadow-secondary/20 hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-0">
                  <Brain className="w-8 h-8 mx-auto mb-3 text-secondary group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                  <h3 className="font-semibold mb-1">AI Focus</h3>
                  <p className="text-sm text-muted-foreground">Machine Learning</p>
                </CardContent>
              </Card>
              <Card className="text-center p-6 hover:scale-105 hover:shadow-lg hover:shadow-secondary/20 hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-0">
                  <Code className="w-8 h-8 mx-auto mb-3 text-secondary group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                  <h3 className="font-semibold mb-1">Development</h3>
                  <p className="text-sm text-muted-foreground">Full Stack</p>
                </CardContent>
              </Card>
              <Card className="text-center p-6 hover:scale-105 hover:shadow-lg hover:shadow-secondary/20 hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-0">
                  <Camera className="w-8 h-8 mx-auto mb-3 text-secondary group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                  <h3 className="font-semibold mb-1">Creative</h3>
                  <p className="text-sm text-muted-foreground">Photography</p>
                </CardContent>
              </Card>
            </div>
          </div>
          {stats ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <Card className="py-6">
                <CardContent className="p-0">
                  <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wide">Followers</p>
                  <p className="text-3xl font-bold">{stats.followers ?? 0}</p>
                </CardContent>
              </Card>
              <Card className="py-6">
                <CardContent className="p-0">
                  <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wide">Following</p>
                  <p className="text-3xl font-bold">{stats.following ?? 0}</p>
                </CardContent>
              </Card>
              <Card className="py-6">
                <CardContent className="p-0">
                  <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wide">Public Repos</p>
                  <p className="text-3xl font-bold">{stats.publicRepos ?? 0}</p>
                </CardContent>
              </Card>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
