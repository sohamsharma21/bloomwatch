"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, RotateCcw, ZoomIn, ZoomOut, Move3d } from "lucide-react"

export function Bloom3DVisualizer() {
  const [isVRMode, setIsVRMode] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [selectedPlant, setSelectedPlant] = useState("cherry-blossom")

  const plants = [
    { id: "cherry-blossom", name: "Cherry Blossom", color: "from-pink-300 to-pink-500" },
    { id: "sunflower", name: "Sunflower", color: "from-yellow-300 to-yellow-500" },
    { id: "lotus", name: "Lotus", color: "from-purple-300 to-purple-500" },
    { id: "lavender", name: "Lavender", color: "from-indigo-300 to-indigo-500" },
  ]

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isVRMode) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setRotation({ x: (y - 0.5) * 20, y: (x - 0.5) * 20 })
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">3D Bloom Visualization</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsVRMode(!isVRMode)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {isVRMode ? "Exit VR" : "Enter VR"}
          </Button>
        </div>
      </div>
      
      {/* Plant Selection */}
      <div className="flex gap-2 mb-4">
        {plants.map((plant) => (
          <Button
            key={plant.id}
            variant={selectedPlant === plant.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPlant(plant.id)}
          >
            {plant.name}
          </Button>
        ))}
      </div>
      
      <div 
        className="relative w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden cursor-move"
        onMouseMove={handleMouseMove}
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
        }}
      >
        {/* 3D Plant Model */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`w-32 h-32 bg-gradient-to-b ${plants.find(p => p.id === selectedPlant)?.color} rounded-full mb-4 animate-pulse shadow-2xl`}></div>
            <p className="text-sm text-muted-foreground font-medium">
              {plants.find(p => p.id === selectedPlant)?.name}
            </p>
            <p className="text-xs text-muted-foreground">Interactive 3D model</p>
          </div>
        </div>
        
        {/* VR Overlay */}
        {isVRMode && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center text-white">
              <Eye className="w-16 h-16 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">VR Mode Active</h4>
              <p className="text-sm">Use VR headset for immersive experience</p>
              <p className="text-xs mt-2 opacity-75">Move your head to explore</p>
            </div>
          </div>
        )}
        
        {/* 3D Environment Elements */}
        <div className="absolute top-4 left-4 w-8 h-8 bg-green-400 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute top-8 right-8 w-6 h-6 bg-yellow-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-8 left-8 w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="flex justify-between mt-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            setRotation({ x: 0, y: 0 })
            setZoom(1)
          }}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset View
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(0.5, zoom * 0.8))}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(2, zoom * 1.2))}>
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Info Panel */}
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Move3d className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">3D Controls</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Move mouse to rotate • Scroll to zoom • Click plants to switch • VR mode for immersive view
        </p>
      </div>
    </Card>
  )
}
