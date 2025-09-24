"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Clock, Leaf, FastForward, Rewind, Flower } from "lucide-react"

export function AnimatedBloomCycle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStage, setCurrentStage] = useState(0)
  const [speed, setSpeed] = useState(1000) // milliseconds per stage
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  const stages = [
    { name: "Seed", icon: <Leaf className="h-4 w-4" />, color: "#8B4513" },
    { name: "Sprout", icon: <Leaf className="h-4 w-4" />, color: "#228B22" },
    { name: "Bud", icon: <Flower className="h-4 w-4" />, color: "#32CD32" },
    { name: "Bloom", icon: <Flower className="h-4 w-4" />, color: "#FF69B4" },
    { name: "Fruit", icon: <Leaf className="h-4 w-4" />, color: "#FF8C00" },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const time = Date.now() * 0.001
      
      // Draw current stage
      const stage = stages[currentStage]
      
      if (currentStage === 0) { // Seed
        ctx.fillStyle = stage.color
        ctx.beginPath()
        ctx.arc(centerX, centerY, 8, 0, Math.PI * 2)
        ctx.fill()
      } else if (currentStage === 1) { // Sprout
        // Stem
        ctx.fillStyle = '#8B4513'
        ctx.fillRect(centerX - 3, centerY - 20, 6, 40)
        // Leaves
        ctx.fillStyle = stage.color
        ctx.beginPath()
        ctx.ellipse(centerX - 15, centerY - 10, 8, 15, -0.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.ellipse(centerX + 15, centerY - 10, 8, 15, 0.5, 0, Math.PI * 2)
        ctx.fill()
      } else if (currentStage === 2) { // Bud
        // Stem
        ctx.fillStyle = '#8B4513'
        ctx.fillRect(centerX - 4, centerY - 30, 8, 60)
        // Bud
        ctx.fillStyle = stage.color
        ctx.beginPath()
        ctx.arc(centerX, centerY - 30, 12, 0, Math.PI * 2)
        ctx.fill()
      } else if (currentStage === 3) { // Bloom
        // Stem
        ctx.fillStyle = '#8B4513'
        ctx.fillRect(centerX - 4, centerY - 30, 8, 60)
        // Flower
        ctx.fillStyle = stage.color
        ctx.beginPath()
        ctx.arc(centerX, centerY - 30, 20 + Math.sin(time * 3) * 3, 0, Math.PI * 2)
        ctx.fill()
        // Petals
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI * 2) / 6 + time
          const petalX = centerX + Math.cos(angle) * 25
          const petalY = centerY - 30 + Math.sin(angle) * 25
          ctx.fillStyle = `hsl(${300 + Math.sin(time + i) * 30}, 70%, 60%)`
          ctx.beginPath()
          ctx.ellipse(petalX, petalY, 8, 15, angle, 0, Math.PI * 2)
          ctx.fill()
        }
      } else if (currentStage === 4) { // Fruit
        // Stem
        ctx.fillStyle = '#8B4513'
        ctx.fillRect(centerX - 4, centerY - 30, 8, 60)
        // Fruit
        ctx.fillStyle = stage.color
        ctx.beginPath()
        ctx.arc(centerX, centerY - 30, 15, 0, Math.PI * 2)
        ctx.fill()
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [currentStage])

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentStage((prev) => (prev + 1) % stages.length)
      }, speed)
      return () => clearInterval(interval)
    }
  }, [isPlaying, stages.length, speed])

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed)
    if (isPlaying) {
      setIsPlaying(false)
      setTimeout(() => setIsPlaying(true), 10)
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Animated Bloom Cycle</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsPlaying(false)
              setCurrentStage(0)
            }}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="relative w-full h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg overflow-hidden mb-4">
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="w-full h-full"
        />
      </div>

      <div className="text-center mb-4">
        <h4 className="font-medium flex items-center justify-center gap-2">
          {stages[currentStage].icon} {stages[currentStage].name}
        </h4>
        <p className="text-sm text-muted-foreground">Stage {currentStage + 1} of {stages.length}</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentStage((prev) => (prev - 1 + stages.length) % stages.length)}
          disabled={isPlaying}
        >
          <Rewind className="w-4 h-4" />
        </Button>
        <div className="flex gap-2">
          <Button
            variant={speed === 2000 ? "default" : "outline"}
            size="sm"
            onClick={() => handleSpeedChange(2000)}
          >
            Slow
          </Button>
          <Button
            variant={speed === 1000 ? "default" : "outline"}
            size="sm"
            onClick={() => handleSpeedChange(1000)}
          >
            Normal
          </Button>
          <Button
            variant={speed === 500 ? "default" : "outline"}
            size="sm"
            onClick={() => handleSpeedChange(500)}
          >
            Fast
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentStage((prev) => (prev + 1) % stages.length)}
          disabled={isPlaying}
        >
          <FastForward className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  )
}