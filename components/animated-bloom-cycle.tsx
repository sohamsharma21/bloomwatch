"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Clock, Leaf } from "lucide-react"

export function AnimatedBloomCycle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStage, setCurrentStage] = useState(0)
  const [speed, setSpeed] = useState(1000) // milliseconds
  
  const stages = [
    { 
      name: "Seed", 
      color: "bg-brown-400", 
      size: "w-4 h-4",
      description: "Dormant seed waiting for optimal conditions",
      icon: "🌱"
    },
    { 
      name: "Sprout", 
      color: "bg-green-300", 
      size: "w-6 h-6",
      description: "First green shoots emerge from soil",
      icon: "🌿"
    },
    { 
      name: "Bud", 
      color: "bg-green-500", 
      size: "w-8 h-8",
      description: "Flower buds begin to form",
      icon: "🌱"
    },
    { 
      name: "Bloom", 
      color: "bg-pink-400", 
      size: "w-12 h-12",
      description: "Full bloom with vibrant colors",
      icon: "🌸"
    },
    { 
      name: "Fruit", 
      color: "bg-orange-400", 
      size: "w-10 h-10",
      description: "Fruit formation and seed development",
      icon: "🍎"
    },
  ]

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentStage((prev) => (prev + 1) % stages.length)
      }, speed)
      return () => clearInterval(interval)
    }
  }, [isPlaying, speed, stages.length])

  const resetCycle = () => {
    setIsPlaying(false)
    setCurrentStage(0)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Animated Bloom Cycle</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={resetCycle}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Speed Control */}
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Speed:</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSpeed(2000)}
          className={speed === 2000 ? "bg-primary text-primary-foreground" : ""}
        >
          Slow
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSpeed(1000)}
          className={speed === 1000 ? "bg-primary text-primary-foreground" : ""}
        >
          Normal
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSpeed(500)}
          className={speed === 500 ? "bg-primary text-primary-foreground" : ""}
        >
          Fast
        </Button>
      </div>
      
      {/* Main Animation Area */}
      <div className="flex items-center justify-center h-32 mb-4 relative">
        <div className="relative">
          {/* Background circle for context */}
          <div className="absolute inset-0 w-20 h-20 bg-green-100 rounded-full opacity-30"></div>
          
          {/* Main plant animation */}
          <div 
            className={`${stages[currentStage].color} ${stages[currentStage].size} rounded-full transition-all duration-500 ease-in-out animate-pulse shadow-lg relative z-10`}
            style={{
              transform: `scale(${isPlaying ? 1.1 : 1})`,
            }}
          >
            {/* Stage icon overlay */}
            <div className="absolute inset-0 flex items-center justify-center text-white text-lg">
              {stages[currentStage].icon}
            </div>
          </div>
          
          {/* Growth rings animation */}
          <div className="absolute inset-0 w-20 h-20 border-2 border-green-300 rounded-full animate-ping opacity-20"></div>
          <div className="absolute inset-0 w-16 h-16 border border-green-400 rounded-full animate-ping opacity-30" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>
      
      {/* Stage Info */}
      <div className="text-center mb-4">
        <h4 className="font-medium text-lg">{stages[currentStage].name}</h4>
        <p className="text-sm text-muted-foreground">{stages[currentStage].description}</p>
        <p className="text-xs text-muted-foreground mt-1">Stage {currentStage + 1} of {stages.length}</p>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-4">
        <div 
          className="bg-gradient-to-r from-green-400 to-pink-400 h-2 rounded-full transition-all duration-500"
          style={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
        ></div>
      </div>
      
      {/* Stage Indicators */}
      <div className="flex justify-between">
        {stages.map((stage, index) => (
          <div key={index} className="text-center flex-1">
            <div className={`w-3 h-3 rounded-full ${stage.color} mx-auto ${index === currentStage ? 'ring-2 ring-primary ring-offset-2' : ''}`}></div>
            <p className="text-xs mt-1 font-medium">{stage.name}</p>
            <div className="text-lg">{stage.icon}</div>
          </div>
        ))}
      </div>
      
      {/* Educational Info */}
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Leaf className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Plant Life Cycle</span>
        </div>
        <p className="text-xs text-muted-foreground">
          This animation shows the complete life cycle of flowering plants, from seed to fruit formation. 
          Each stage represents different growth phases influenced by environmental factors.
        </p>
      </div>
    </Card>
  )
}
