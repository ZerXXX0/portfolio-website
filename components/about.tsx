import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Camera, Code, Brain } from "lucide-react"

export function About() {
  return (
    <section id="about" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 font-sans">About Me</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <p className="text-lg leading-relaxed mb-6">
                I'm a driven Computer Science undergraduate at Telkom University with a passion for Artificial
                Intelligence and Software Development. I specialize in building AI-powered solutions that make a real
                impact.
              </p>
              <p className="text-lg leading-relaxed">
                My work spans from computer vision systems for traffic safety to medical diagnostic tools. As a
                freelance designer and photography enthusiast, I bring a creative perspective to technical challenges.
              </p>
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
        </div>
      </div>
    </section>
  )
}
