import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { PublicationItem, ResearchItem } from "@/lib/profile"
import { BookOpen, FileText } from "lucide-react"

interface ResearchProps {
  publications?: PublicationItem[]
  research?: ResearchItem[]
}

export function Research({ publications = [], research = [] }: ResearchProps) {
  if (!publications.length && !research.length) return null

  return (
    <section id="research" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 font-sans">Research & Publications</h2>
          
          <div className="grid gap-10 md:grid-cols-2">
            {/* Publications Column */}
            {publications.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 shrink-0" />
                  Published Work
                </h3>
                <div className="space-y-6">
                  {publications.map((pub, idx) => (
                    <Card
                      key={idx}
                      className="border-l-4 border-black dark:border-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                    >
                      <CardHeader>
                        <CardTitle className="text-lg leading-snug">{pub.title}</CardTitle>
                        <CardDescription className="text-sm font-medium">
                          Publisher: {pub.publisher} | {pub.date}
                        </CardDescription>
                      </CardHeader>
                      {pub.url && (
                        <CardContent className="pt-0">
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold underline hover:text-muted-foreground transition-colors"
                          >
                            View Publication
                          </a>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Ongoing Research Column */}
            {research.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 shrink-0" />
                  Ongoing Research
                </h3>
                <div className="space-y-6">
                  {research.map((res, idx) => (
                    <Card
                      key={idx}
                      className="border-l-4 border-zinc-400 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                    >
                      <CardHeader>
                        <CardTitle className="text-lg leading-snug">{res.title}</CardTitle>
                        {res.status && (
                          <CardDescription className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            {res.status}
                          </CardDescription>
                        )}
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
