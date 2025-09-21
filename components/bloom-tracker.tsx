"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Flower2, Trophy } from "lucide-react"

export function BloomTracker() {
  const [collectedBlooms, setCollectedBlooms] = useState(12)
  const totalBlooms = 50
  const progress = (collectedBlooms / totalBlooms) * 100

  const handleCollectBloom = () => {
    if (collectedBlooms < totalBlooms) {
      setCollectedBlooms((prev) => prev + 1)
    }
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <Trophy className="h-4 w-4 text-primary" />
          Bloom Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">
            {collectedBlooms}/{totalBlooms}
          </p>
          <p className="text-xs text-muted-foreground">Blooms Collected</p>
        </div>

        <Progress value={progress} className="h-2" />

        <Button onClick={handleCollectBloom} disabled={collectedBlooms >= totalBlooms} size="sm" className="w-full">
          <Flower2 className="h-4 w-4 mr-2" />
          {collectedBlooms >= totalBlooms ? "Complete!" : "Collect Bloom"}
        </Button>

        {progress >= 100 && <div className="text-center text-xs text-primary font-medium">🎉 Collection Complete!</div>}
      </CardContent>
    </Card>
  )
}
