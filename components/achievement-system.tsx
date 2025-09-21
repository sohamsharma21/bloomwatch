"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Target, Award, Lock } from "lucide-react"

const achievements = [
  {
    id: "explorer",
    title: "Bloom Explorer",
    description: "Visit 10 different bloom hotspots",
    progress: 7,
    total: 10,
    unlocked: false,
    icon: <Target className="h-4 w-4" />,
    reward: "Explorer Badge",
  },
  {
    id: "collector",
    title: "Species Collector",
    description: "Discover all 4 main flower species",
    progress: 4,
    total: 4,
    unlocked: true,
    icon: <Star className="h-4 w-4" />,
    reward: "Collector Badge",
  },
  {
    id: "predictor",
    title: "Bloom Predictor",
    description: "Make 5 accurate bloom predictions",
    progress: 3,
    total: 5,
    unlocked: false,
    icon: <Trophy className="h-4 w-4" />,
    reward: "Predictor Badge",
  },
  {
    id: "researcher",
    title: "Data Researcher",
    description: "Export 3 research reports",
    progress: 1,
    total: 3,
    unlocked: false,
    icon: <Award className="h-4 w-4" />,
    reward: "Researcher Badge",
  },
]

export function AchievementSystem() {
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(null)

  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const totalAchievements = achievements.length

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" />
            Achievements
          </span>
          <Badge variant="secondary" className="text-xs">
            {unlockedCount}/{totalAchievements}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-3 rounded-lg border transition-all cursor-pointer ${
              achievement.unlocked ? "border-primary/20 bg-primary/5" : "border-border hover:border-primary/40"
            }`}
            onClick={() => setSelectedAchievement(selectedAchievement === achievement.id ? null : achievement.id)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded ${
                  achievement.unlocked ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {achievement.unlocked ? achievement.icon : <Lock className="h-4 w-4" />}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-xs">{achievement.title}</h4>
                  {achievement.unlocked && (
                    <Badge variant="default" className="text-xs">
                      Unlocked!
                    </Badge>
                  )}
                </div>

                <div className="space-y-1">
                  <Progress value={(achievement.progress / achievement.total) * 100} className="h-1.5" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{achievement.description}</span>
                    <span>
                      {achievement.progress}/{achievement.total}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {selectedAchievement === achievement.id && (
              <div className="mt-3 pt-3 border-t border-border">
                <div className="text-xs text-muted-foreground">
                  <strong>Reward:</strong> {achievement.reward}
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
