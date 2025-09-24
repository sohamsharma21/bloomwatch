"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Clock, Leaf, Zap } from "lucide-react"

export function AnimatedBloomCycle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStage, setCurrentStage] = useState(0)
  const [speed, setSpeed] = useState(1000) // milliseconds
  const [isAutoMode, setIsAutoMode] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
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
    if (isAutoMode && isPlaying) {
      const interval = setInterval(() => {
        setCurrentStage((prev) => (prev + 1) % stages.length)
      }, speed)
      return () => clearInterval(interval)
    }
  }, [isAutoMode, isPlaying, speed, stages.length])

  const resetCycle = () => {
    setIsPlaying(false)
    setCurrentStage(0)
    setIsAutoMode(false)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextStage = () => {
    setCurrentStage((prev) => (prev + 1) % stages.length)
  }

  const prevStage = () => {
    setCurrentStage((prev) => (prev - 1 + stages.length) % stages.length)
  }

  if (!isClient) {
    return (
      <Card className="p-6">
        <div className="h-96 bg-muted/20 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-pink-400 rounded-full mb-4 animate-pulse"></div>
            <p className="text-sm text-muted-foreground">Loading Animation...</p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Realistic 3D Plant Growth Animation</h3>
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
      
      {/* Controls */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex gap-2">
          <Clock className="w-4 h-4 text-muted-foreground mt-2" />
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
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAutoMode(!isAutoMode)}
            className={isAutoMode ? "bg-primary text-primary-foreground" : ""}
          >
            <Zap className="w-4 h-4 mr-2" />
            Auto
          </Button>
        </div>
      </div>
      
      {/* Manual Controls */}
      {!isAutoMode && (
        <div className="flex gap-2 mb-4">
          <Button variant="outline" size="sm" onClick={prevStage}>
            ← Previous
          </Button>
          <Button variant="outline" size="sm" onClick={nextStage}>
            Next →
          </Button>
        </div>
      )}
      
      {/* 3D Animation Canvas */}
      <div className="relative w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden mb-4">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            {/* Animated Plant Representation */}
            <div className="relative mb-8">
              {/* Ground */}
              <div className="w-32 h-4 bg-brown-600 rounded-full mx-auto mb-4"></div>
              
              {/* Plant Stages */}
              {currentStage >= 0 && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  {/* Seed */}
                  <div className={`w-2 h-2 bg-brown-500 rounded-full ${isPlaying ? 'animate-bounce' : ''}`}></div>
                </div>
              )}
              
              {currentStage >= 1 && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  {/* Stem */}
                  <div className="w-1 h-8 bg-green-600 mx-auto"></div>
                </div>
              )}
              
              {currentStage >= 2 && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  {/* Leaves */}
                  <div className="flex justify-center space-x-2">
                    <div className="w-3 h-2 bg-green-500 rounded-full transform rotate-45"></div>
                    <div className="w-3 h-2 bg-green-500 rounded-full transform -rotate-45"></div>
                  </div>
                </div>
              )}
              
              {currentStage >= 3 && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  {/* Flower */}
                  <div className={`w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full ${isPlaying ? 'animate-pulse' : ''}`}></div>
                </div>
              )}
              
              {currentStage >= 4 && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  {/* Fruit */}
                  <div className={`w-6 h-6 bg-orange-400 rounded-full ${isPlaying ? 'animate-bounce' : ''}`}></div>
                </div>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground font-medium">
              {stages[currentStage].name}
            </p>
            <p className="text-xs text-muted-foreground">
              {stages[currentStage].description}
            </p>
            <div className="text-3xl mt-2">{stages[currentStage].icon}</div>
          </div>
        </div>
        
        {/* Animation Info Overlay */}
        <div className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded text-xs">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4" />
            <span>Stage {currentStage + 1} of {stages.length}</span>
          </div>
        </div>
      </div>
      
      {/* Stage Info */}
      <div className="text-center mb-4">
        <h4 className="font-medium text-lg">{stages[currentStage].name}</h4>
        <p className="text-sm text-muted-foreground">{stages[currentStage].description}</p>
        <div className="text-2xl mt-2">{stages[currentStage].icon}</div>
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
          <span className="text-sm font-medium">Realistic Plant Life Cycle</span>
        </div>
        <p className="text-xs text-muted-foreground">
          This 3D animation shows the complete life cycle of flowering plants with realistic 
          growth patterns, environmental interactions, and seasonal changes. Each stage 
          represents different growth phases influenced by environmental factors.
        </p>
      </div>
    </Card>
  )
}