"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Linkedin, Calendar, Briefcase, MessageSquare, ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react"

export interface LinkedinProject {
  title: string
  period?: string
  role?: string
  organization?: string
  description?: string
  skills?: string[]
}

export interface LinkedinPost {
  time: string
  content: string
  category?: string
  images?: string[]
}

interface LinkedinProps {
  projects?: LinkedinProject[]
  posts?: LinkedinPost[]
  profilePicture?: string
  profileUrl?: string
}

interface PostImagesProps {
  images?: string[]
  onImageClick: (img: string, group: string[]) => void
}

function PostImages({ images, onImageClick }: PostImagesProps) {
  if (!images || images.length === 0) return null

  if (images.length === 1) {
    return (
      <div 
        onClick={() => onImageClick(images[0], images)}
        className="mt-2 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 max-h-[500px] flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 cursor-zoom-in group relative"
      >
        <img 
          src={images[0]} 
          alt="Post Attachment" 
          className="max-h-[500px] w-auto max-w-full object-contain transition-all duration-300 group-hover:brightness-95" 
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>
    )
  }

  if (images.length === 2) {
    return (
      <div className="mt-2 grid grid-cols-2 gap-1.5 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
        {images.map((img, i) => (
          <div 
            key={i} 
            onClick={() => onImageClick(img, images)}
            className="aspect-[4/3] w-full overflow-hidden cursor-zoom-in relative group"
          >
            <img 
              src={img} 
              alt={`Post Attachment ${i + 1}`} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        ))}
      </div>
    )
  }

  if (images.length === 3) {
    return (
      <div className="mt-2 grid grid-cols-3 gap-1.5 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 aspect-[16/10]">
        <div 
          onClick={() => onImageClick(images[0], images)}
          className="col-span-2 h-full overflow-hidden cursor-zoom-in relative group"
        >
          <img 
            src={images[0]} 
            alt="Post Attachment 1" 
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
        <div className="grid grid-rows-2 gap-1.5 h-full">
          {images.slice(1, 3).map((img, i) => (
            <div 
              key={i} 
              onClick={() => onImageClick(img, images)}
              className="overflow-hidden h-full cursor-zoom-in relative group"
            >
              <img 
                src={img} 
                alt={`Post Attachment ${i + 2}`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // 4 or more images
  const displayImages = images.slice(0, 4)
  const remaining = images.length - 4

  return (
    <div className="mt-2 grid grid-cols-2 gap-1.5 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 aspect-[16/10]">
      {displayImages.map((img, i) => {
        const isLast = i === 3
        return (
          <div 
            key={i} 
            onClick={() => onImageClick(img, images)}
            className="relative w-full h-full overflow-hidden cursor-zoom-in group"
          >
            <img 
              src={img} 
              alt={`Post Attachment ${i + 1}`} 
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
            />
            {isLast && remaining > 0 ? (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-2xl z-10 group-hover:bg-black/50 transition-colors">
                +{remaining}
              </div>
            ) : (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            )}
          </div>
        )
      })}
    </div>
  )
}

export function LinkedinSection({ 
  projects = [], 
  posts = [], 
  profilePicture,
  profileUrl = "https://www.linkedin.com/in/muhammad-ghozy-abdurrahman/" 
}: LinkedinProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const [activeGroup, setActiveGroup] = useState<string[]>([])

  const openLightbox = (img: string, group: string[]) => {
    setActiveImage(img)
    setActiveGroup(group)
  }

  const closeLightbox = useCallback(() => {
    setActiveImage(null)
    setActiveGroup([])
  }, [])

  const navigateImage = useCallback((direction: "next" | "prev") => {
    if (!activeImage || activeGroup.length <= 1) return
    const currentIndex = activeGroup.indexOf(activeImage)
    if (currentIndex === -1) return

    let nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1
    if (nextIndex >= activeGroup.length) nextIndex = 0
    if (nextIndex < 0) nextIndex = activeGroup.length - 1

    setActiveImage(activeGroup[nextIndex])
  }, [activeImage, activeGroup])

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeImage) return
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") navigateImage("next")
      if (e.key === "ArrowLeft") navigateImage("prev")
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeImage, closeLightbox, navigateImage])

  return (
    <>
      {/* LinkedIn Projects Section */}
      {projects.length > 0 && (
        <section id="linkedin-projects" className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-4">
                <div>
                  <h2 className="text-4xl font-bold font-sans flex items-center gap-3">
                    <Linkedin className="w-8 h-8 shrink-0 text-black dark:text-white" />
                    LinkedIn Projects
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    Key projects and initiatives managed and showcased on LinkedIn.
                  </p>
                </div>
                <Button variant="outline" asChild className="self-start md:self-auto hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  <a href={profileUrl} target="_blank" rel="noopener noreferrer">
                    View Full Profile <ArrowUpRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {projects.map((proj, idx) => (
                  <Card key={idx} className="flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border-zinc-200 dark:border-zinc-800">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded">
                          {proj.organization || "Project"}
                        </span>
                        {proj.period && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {proj.period}
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-xl leading-snug font-bold mt-1">
                        {proj.title}
                      </CardTitle>
                      {proj.role && (
                        <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 mt-1">
                          <Briefcase className="w-4 h-4" />
                          {proj.role}
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between pt-0">
                      {proj.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                          {proj.description}
                        </p>
                      )}
                      {proj.skills && proj.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-auto">
                          {proj.skills.map((skill, sIdx) => (
                            <Badge key={sIdx} variant="outline" className="text-[11px] px-2 py-0.5 border-zinc-300 dark:border-zinc-700 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* LinkedIn Posts Section */}
      {posts.length > 0 && (
        <section id="linkedin-posts" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-4xl font-bold font-sans flex items-center gap-3">
                  <MessageSquare className="w-8 h-8 shrink-0 text-black dark:text-white" />
                  LinkedIn Feed
                </h2>
                <p className="text-muted-foreground mt-2">
                  Recent updates, thoughts, and career milestones shared on LinkedIn.
                </p>
              </div>

              <div className="space-y-8">
                {posts.map((post, idx) => (
                  <Card key={idx} className="border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-all duration-300">
                    <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-900">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-sm shrink-0 border border-zinc-300 dark:border-zinc-700">
                            {profilePicture ? (
                              <img src={profilePicture} alt="Muhammad Ghozy Abdurrahman" className="w-full h-full object-cover" />
                            ) : (
                              "MGA"
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-sm">Muhammad Ghozy Abdurrahman</div>
                            <div className="text-xs text-muted-foreground">{post.time}</div>
                          </div>
                        </div>
                        {post.category && (
                          <Badge variant="secondary" className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 border-none px-2.5 py-0.5">
                            {post.category}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-5 flex flex-col gap-4">
                      <p className="text-sm md:text-base text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed">
                        {post.content}
                      </p>
                      <PostImages images={post.images} onImageClick={openLightbox} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md transition-opacity duration-300 animate-in fade-in">
          {/* Close button top right */}
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-zinc-900/80 text-white/80 hover:text-white hover:bg-zinc-800 transition-all duration-200 z-50"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation controls */}
          {activeGroup.length > 1 && (
            <>
              <button
                onClick={() => navigateImage("prev")}
                className="absolute left-4 p-3 rounded-full bg-zinc-900/80 text-white/80 hover:text-white hover:bg-zinc-800 transition-all duration-200 z-50"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigateImage("next")}
                className="absolute right-4 p-3 rounded-full bg-zinc-900/80 text-white/80 hover:text-white hover:bg-zinc-800 transition-all duration-200 z-50"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Main active image */}
          <div className="relative max-w-[90vw] max-h-[80vh] flex items-center justify-center p-2">
            <img 
              src={activeImage} 
              alt="Expanded post media" 
              className="max-w-full max-h-[85vh] object-contain rounded animate-in zoom-in-95 duration-200 select-none shadow-2xl"
            />
          </div>

          {/* Image counter indicator */}
          {activeGroup.length > 1 && (
            <div className="mt-4 px-4 py-1.5 rounded-full bg-zinc-900/80 text-zinc-400 text-sm font-medium border border-zinc-800 select-none">
              {activeGroup.indexOf(activeImage) + 1} of {activeGroup.length}
            </div>
          )}
        </div>
      )}
    </>
  )
}
