import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github } from "lucide-react"

const projects = [
  {
    title: "Traffic Accident Detection System",
    description:
      "Multimodal AI system using computer vision and audio analysis to detect traffic accidents and classify emergency vehicles. Deployed with Streamlit for real-time monitoring.",
    technologies: ["Python", "Computer Vision", "Audio Analysis", "Streamlit"],
    github: "https://github.com/ZerXXX0/Traffic-Accident-and-Vehicle-Detection-Multimodal",
    image: "/traffic-violations-video-analytics-x1000.jpg",
  },
  {
    title: "Diabetic Retinopathy Classifier",
    description:
      "Lightweight medical AI using MobileViTV2 achieving 83% accuracy with only 4.9M parameters. Optimized for on-device DR screening in low-resource settings.",
    technologies: ["Python", "MobileViTV2", "Medical AI", "PyTorch"],
    github: "https://github.com/ZerXXX0/diabetic-retinopathy-severity-classification",
    image: "/dreamstime_xxl_82470163-696x461.jpg",
  },
  {
    title: "Assistify Personal Assistant",
    description:
      "Web-based digital personal assistant application designed to help users manage daily productivity and organization with essential digital tools.",
    technologies: ["Java", "Web Development", "UI/UX"],
    github: "https://github.com/ZerXXX0/Assistify-Digital-Personal-Assistant-Web-Application",
    image: "/digital-assistant-web-interface.png",
  },
  {
    title: "Sales Prediction System",
    description:
      "Formula milk sales prediction using different machine learning algorithms. Built for competition with team 'anomali' focusing on accurate forecasting.",
    technologies: ["Python", "Machine Learning", "Data Analysis", "Jupyter"],
    github: "https://github.com/ZerXXX0/sales-prediction",
    image: "/sales-prediction-dashboard.png",
  },
  {
    title: "Mountain Trail Trash Detection",
    description:
      "Computer vision system for detecting trash on mountain hiking trails to help preserve natural environments and promote eco-friendly hiking.",
    technologies: ["Python", "Computer Vision", "Environmental AI"],
    github: "https://github.com/ZerXXX0/Trash-Detection-on-Mountain-Hiking-Trail",
    image: "/rinjani-trash.jpg",
  },
  {
    title: "Twitter Sentiment Analysis",
    description:
      "NLP project for analyzing Twitter's tweets sentiment, classifying them as positive, negative, or neutral using natural language processing techniques.",
    technologies: ["Python", "NLP", "Sentiment Analysis"],
    github: "https://github.com/ZerXXX0/Twitter-s-Tweets-Sentiment-Prediction-NLP",
    image: "/social-media-sentiment-analysis.png",
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 font-sans">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 hover:border-primary/20 transition-all duration-500 cursor-pointer"
              >
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                      className="flex-1 bg-transparent hover:scale-105 hover:shadow-md hover:border-primary transition-all duration-300"
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
