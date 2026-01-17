import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Github, Instagram, Linkedin, Link } from "lucide-react"
import type { ContactInfo } from "@/lib/profile"

type ContactProps = {
  contact?: ContactInfo
}

export function Contact({ contact }: ContactProps) {
  const { email, location, github, instagram, linkedin, website } = contact || {}

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 font-sans">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
              <p className="text-lg mb-8 leading-relaxed">
                I'm always interested in discussing new opportunities, collaborations, or just chatting about AI and
                technology. Feel free to reach out!
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300 group">
                  <Mail className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform duration-300" />
                  <span>{email || "ghozyhernandez@gmail.com"}</span>
                </div>
                <div className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300 group">
                  <MapPin className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform duration-300" />
                  <span>{location || "Bandung, Indonesia"}</span>
                </div>
                <div className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300 group">
                  <Github className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform duration-300" />
                  <a
                    href={github || "https://github.com/ZerXXX0"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-secondary hover:scale-105 transition-all duration-300"
                  >
                    {(github || "https://github.com/ZerXXX0").replace("https://", "")}
                  </a>
                </div>
                <div className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300 group">
                  <Instagram className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform duration-300" />
                  <a
                    href={instagram || "https://instagram.com/zerx_photo"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-secondary hover:scale-105 transition-all duration-300"
                  >
                    @{(instagram || "https://instagram.com/zerx_photo").split("/").pop()}
                  </a>
                </div>
                {linkedin && (
                  <div className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300 group">
                    <Linkedin className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform duration-300" />
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-secondary hover:scale-105 transition-all duration-300"
                    >
                      {linkedin.replace("https://www.linkedin.com/in/", "").replace("/", "")}
                    </a>
                  </div>
                )}
                {website ? (
                  <div className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300 group">
                    <Link className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform duration-300" />
                    <a href={website} target="_blank" rel="noopener noreferrer" className="hover:text-secondary">
                      {website.replace("https://", "")}
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
            <Card className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>I'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        className="hover:border-primary/50 hover:shadow-sm transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        className="hover:border-primary/50 hover:shadow-sm transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="hover:border-primary/50 hover:shadow-sm transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Project Collaboration"
                      className="hover:border-primary/50 hover:shadow-sm transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project or idea..."
                      rows={4}
                      className="hover:border-primary/50 hover:shadow-sm transition-all duration-200"
                    />
                  </div>
                  <Button type="submit" className="w-full hover:scale-105 hover:shadow-lg transition-all duration-300">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
