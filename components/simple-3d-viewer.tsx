"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, RotateCcw, ZoomIn, ZoomOut, Move3d, Flower, Leaf } from "lucide-react"

export function Simple3DViewer() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [isVRMode, setIsVRMode] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw 3D-like plant using 2D canvas
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const time = Date.now() * 0.001
      
      // Stem
      ctx.fillStyle = '#8B4513'
      ctx.fillRect(centerX - 5, centerY + 50, 10, 100)
      
      // Leaves
      ctx.fillStyle = '#228B22'
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI * 2) / 6 + time * 0.5
        const leafX = centerX + Math.cos(angle) * 40
        const leafY = centerY + Math.sin(angle) * 40
        ctx.beginPath()
        ctx.ellipse(leafX, leafY, 15, 8, angle, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // Flower
      ctx.fillStyle = '#FF69B4'
      ctx.beginPath()
      ctx.arc(centerX, centerY - 20, 25 + Math.sin(time * 2) * 5, 0, Math.PI * 2)
      ctx.fill()
      
      // Petals
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8 + time
        const petalX = centerX + Math.cos(angle) * 30
        const petalY = centerY - 20 + Math.sin(angle) * 30
        ctx.fillStyle = `hsl(${300 + Math.sin(time + i) * 30}, 70%, 60%)`
        ctx.beginPath()
        ctx.ellipse(petalX, petalY, 12, 20, angle, 0, Math.PI * 2)
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
  }, [])

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
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (!isVRMode) {
                document.documentElement.requestFullscreen()
              } else {
                document.exitFullscreen()
              }
            }}
          >
            <Move3d className="w-4 h-4 mr-2" />
            Fullscreen
          </Button>
        </div>
      </div>

      <div className="relative w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="w-full h-full"
          style={{ imageRendering: 'pixelated' }}
        />
        
        {isVRMode && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center text-white">
              <Eye className="w-16 h-16 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">VR Mode Active</h4>
              <p className="text-sm">Immersive 3D experience</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-4">
        <Button variant="outline" size="sm" onClick={() => setRotation({ x: 0, y: 0 })}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset View
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setZoom(zoom * 0.8)}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setZoom(zoom * 1.2)}>
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
