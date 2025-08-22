import { Button } from "@/components/ui/button"
import { Github, Instagram, Mail } from "lucide-react"

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-sans">Ghozy Abdurrahman</h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">AI Engineer & Software Developer</p>
          <p className="text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Computer Science student at Telkom University building AI-powered solutions. From traffic safety systems to
            medical diagnostics, I combine code with creativity to solve real-world problems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto hover:scale-105 hover:shadow-lg transition-all duration-300"
              asChild
            >
              <a href="#projects">View My Work</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent hover:scale-105 hover:shadow-lg transition-all duration-300"
              asChild
            >
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/ZerXXX0"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 hover:scale-110 hover:shadow-lg hover:backdrop-blur-sm transition-all duration-300 group"
            >
              <Github className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://instagram.com/zerx_photo"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 hover:scale-110 hover:shadow-lg hover:backdrop-blur-sm transition-all duration-300 group"
            >
              <Instagram className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="mailto:ghozyhernandez@gmail.com"
              className="p-3 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 hover:scale-110 hover:shadow-lg hover:backdrop-blur-sm transition-all duration-300 group"
            >
              <Mail className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
