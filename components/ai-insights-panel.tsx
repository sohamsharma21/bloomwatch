"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Sparkles, TrendingUp, AlertTriangle, Lightbulb, RefreshCw } from "lucide-react"

const aiInsights = [
  {
    type: "prediction",
    title: "Climate Shift Alert",
    message: "Cherry Blossoms expected 2 weeks earlier in 2026 due to rising temperatures",
    confidence: 87,
    impact: "high",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  {
    type: "trend",
    title: "Bloom Duration Extension",
    message: "Lotus blooms showing 15% longer flowering periods across Asia",
    confidence: 92,
    impact: "medium",
    icon: <TrendingUp className="h-4 w-4" />,
  },
  {
    type: "insight",
    title: "Species Migration Pattern",
    message: "Lavender cultivation expanding northward by 200km over past decade",
    confidence: 78,
    impact: "medium",
    icon: <Lightbulb className="h-4 w-4" />,
  },
  {
    type: "prediction",
    title: "Rainfall Correlation",
    message: "Sunflower blooms predicted to increase 25% with current precipitation trends",
    confidence: 84,
    impact: "high",
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    type: "trend",
    title: "Biodiversity Index",
    message: "Global flower diversity showing positive 3.2% annual growth",
    confidence: 95,
    impact: "low",
    icon: <TrendingUp className="h-4 w-4" />,
  },
]

export function AIInsightsPanel() {
  const [currentInsight, setCurrentInsight] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentInsight((prev) => (prev + 1) % aiInsights.length)
        setIsAnimating(false)
      }, 300)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentInsight((prev) => (prev + 1) % aiInsights.length)
      setIsAnimating(false)
    }, 300)
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-500 bg-red-50 dark:bg-red-950/20"
      case "medium":
        return "text-orange-500 bg-orange-50 dark:bg-orange-950/20"
      case "low":
        return "text-green-500 bg-green-50 dark:bg-green-950/20"
      default:
        return "text-gray-500 bg-gray-50 dark:bg-gray-950/20"
    }
  }

  const insight = aiInsights[currentInsight]

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary" />
            AI Bloom Forecast
          </span>
          <Button variant="ghost" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-3 w-3" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`transition-all duration-300 ${isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10 text-primary">{insight.icon}</div>
            <div className="flex-1 space-y-2">
              <h3 className="font-medium text-sm">{insight.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{insight.message}</p>

              <div className="flex items-center justify-between">
                <Badge variant="outline" className={`text-xs ${getImpactColor(insight.impact)}`}>
                  {insight.impact.toUpperCase()} IMPACT
                </Badge>
                <span className="text-xs font-medium text-primary">{insight.confidence}% confidence</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center gap-1">
          {aiInsights.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentInsight ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
