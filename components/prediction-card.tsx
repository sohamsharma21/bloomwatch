import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface PredictionCardProps {
  title: string
  prediction: string
  confidence: number
  trend: "early" | "late" | "shift" | "extend"
  icon: React.ReactNode
}

export function PredictionCard({ title, prediction, confidence, trend, icon }: PredictionCardProps) {
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "early":
        return "text-blue-500"
      case "late":
        return "text-orange-500"
      case "shift":
        return "text-purple-500"
      case "extend":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  const getTrendBadge = (trend: string) => {
    switch (trend) {
      case "early":
        return "Earlier"
      case "late":
        return "Later"
      case "shift":
        return "Shifting"
      case "extend":
        return "Extended"
      default:
        return "Unknown"
    }
  }

  return (
    <Card className="glass hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            {icon}
            {title}
          </span>
          <Badge variant="outline" className={getTrendColor(trend)}>
            {getTrendBadge(trend)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{prediction}</p>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Confidence</span>
            <span className="font-medium">{confidence}%</span>
          </div>
          <Progress value={confidence} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}
