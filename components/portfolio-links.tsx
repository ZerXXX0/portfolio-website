import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { PortfolioLink } from "@/lib/profile"
import { Github } from "lucide-react"

interface PortfolioLinksProps {
  links?: PortfolioLink[]
}

export function PortfolioLinks({ links = [] }: PortfolioLinksProps) {
  if (!links.length) return null

  return (
    <section id="portfolio" className="py-20 bg-muted/60">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10 font-sans">Portfolio</h2>
          <div className="space-y-6">
            {links.map((link) => (
              <Card key={link.url} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Github className="w-6 h-6 text-primary" />
                    {link.label}
                  </CardTitle>
                  {link.description ? <CardDescription className="text-base">{link.description}</CardDescription> : null}
                </CardHeader>
                <CardContent className="pt-0 md:pt-6">
                  <Button asChild variant="secondary">
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      View work
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
