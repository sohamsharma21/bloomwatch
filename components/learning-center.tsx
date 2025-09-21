"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { BookOpen, ChevronDown, ChevronRight, Satellite, Microscope, Globe } from "lucide-react"

const learningTopics = [
  {
    id: "phenology",
    title: "What is Phenology?",
    category: "Basics",
    icon: <BookOpen className="h-4 w-4" />,
    content:
      "Phenology is the study of periodic plant and animal life cycle events and how these are influenced by seasonal and interannual variations in climate, as well as habitat factors.",
  },
  {
    id: "satellite",
    title: "How do satellites track blooms?",
    category: "Technology",
    icon: <Satellite className="h-4 w-4" />,
    content:
      "Satellites use multispectral imaging to detect changes in vegetation indices like NDVI (Normalized Difference Vegetation Index), which can indicate flowering periods and plant health.",
  },
  {
    id: "climate",
    title: "Climate Impact on Flowering",
    category: "Science",
    icon: <Globe className="h-4 w-4" />,
    content:
      "Temperature, precipitation, and seasonal patterns directly affect flowering times. Climate change is causing many species to bloom earlier or shift their geographic ranges.",
  },
  {
    id: "research",
    title: "NASA Space Apps Challenge",
    category: "Challenge",
    icon: <Microscope className="h-4 w-4" />,
    content:
      "This application was developed for the NASA Space Apps Challenge, demonstrating how Earth observation data can be used to monitor and predict global flowering patterns.",
  },
]

export function LearningCenter() {
  const [openTopics, setOpenTopics] = useState<string[]>([])

  const toggleTopic = (topicId: string) => {
    setOpenTopics((prev) => (prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]))
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Basics: "bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400",
      Technology: "bg-purple-50 text-purple-700 dark:bg-purple-950/20 dark:text-purple-400",
      Science: "bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400",
      Challenge: "bg-orange-50 text-orange-700 dark:bg-orange-950/20 dark:text-orange-400",
    }
    return colors[category as keyof typeof colors] || "bg-gray-50 text-gray-700"
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BookOpen className="h-5 w-5 text-primary" />
          Learning Center
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {learningTopics.map((topic) => (
          <Collapsible key={topic.id} open={openTopics.includes(topic.id)} onOpenChange={() => toggleTopic(topic.id)}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-4 h-auto text-left hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-primary/10 text-primary">{topic.icon}</div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-sm">{topic.title}</h3>
                    <Badge variant="outline" className={`text-xs ${getCategoryColor(topic.category)}`}>
                      {topic.category}
                    </Badge>
                  </div>
                </div>
                {openTopics.includes(topic.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{topic.content}</p>
            </CollapsibleContent>
          </Collapsible>
        ))}

        <div className="pt-4 border-t border-border">
          <Button variant="outline" className="w-full bg-transparent" size="sm">
            <BookOpen className="h-4 w-4 mr-2" />
            View Full Documentation
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
