"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Image, Video, Camera, Upload, Play, Download, Share2, Heart, Eye, Move3d } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

function Media3DPreview({ type, source }: { type: string; source: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

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
      
      if (type === "photo") {
        // 3D photo frame
        ctx.fillStyle = '#8B4513'
        ctx.fillRect(centerX - 40, centerY - 30, 80, 60)
        ctx.fillStyle = '#87CEEB'
        ctx.fillRect(centerX - 35, centerY - 25, 70, 50)
        
        // Photo content
        ctx.fillStyle = '#FF69B4'
        ctx.beginPath()
        ctx.arc(centerX, centerY, 15, 0, Math.PI * 2)
        ctx.fill()
      } else if (type === "video") {
        // 3D video sphere
        ctx.fillStyle = '#32CD32'
        ctx.beginPath()
        ctx.arc(centerX, centerY, 25 + Math.sin(time * 2) * 3, 0, Math.PI * 2)
        ctx.fill()
        
        // Play button
        ctx.fillStyle = '#FFFFFF'
        ctx.beginPath()
        ctx.moveTo(centerX - 5, centerY - 8)
        ctx.lineTo(centerX - 5, centerY + 8)
        ctx.lineTo(centerX + 8, centerY)
        ctx.closePath()
        ctx.fill()
      } else if (type === "timelapse") {
        // 3D timelapse cylinder
        ctx.fillStyle = '#FF6347'
        ctx.fillRect(centerX - 20, centerY - 15, 40, 30)
        
        // Time progression
        for (let i = 0; i < 5; i++) {
          const x = centerX - 15 + i * 7.5
          const height = 10 + Math.sin(time + i) * 5
          ctx.fillStyle = `hsl(${120 + i * 20}, 70%, 50%)`
          ctx.fillRect(x, centerY - height/2, 5, height)
        }
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [type])

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={150}
      className="w-full h-full"
    />
  )
}

export function MultimediaGallery() {
  const [activeTab, setActiveTab] = useState("photos")
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const mediaItems = [
    { type: "photo", title: "Spring Cherry Blossoms", source: "/pink-cherry-blossom-tree-in-spring.jpg" },
    { type: "photo", title: "Summer Sunflowers", source: "/bright-yellow-sunflower-field.jpg" },
    { type: "photo", title: "Autumn Lotus", source: "/beautiful-pink-lotus-flower-in-pond.jpg" },
    { type: "video", title: "Bloom Time-lapse", source: "/timelapse-bloom.mp4" },
    { type: "timelapse", title: "Flower Growth", source: "/flower-growth.mp4" },
    { type: "photo", title: "Lavender Fields", source: "/purple-lavender-field-in-provence.jpg" },
  ]

  const filteredMedia = mediaItems.filter(item => {
    if (activeTab === "photos") return item.type === "photo"
    if (activeTab === "videos") return item.type === "video"
    if (activeTab === "timelapse") return item.type === "timelapse"
    return true
  })

  const handleMediaClick = (index: number) => {
    setSelectedMedia(index)
    setIsModalOpen(true)
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Multimedia Gallery</h3>
        <Button variant="outline" size="sm">
          <Upload className="w-4 h-4 mr-2" />
          Upload Media
        </Button>
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          variant={activeTab === "photos" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("photos")}
        >
          <Image className="w-4 h-4 mr-2" />
          Photos
        </Button>
        <Button
          variant={activeTab === "videos" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("videos")}
        >
          <Video className="w-4 h-4 mr-2" />
          Videos
        </Button>
        <Button
          variant={activeTab === "timelapse" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("timelapse")}
        >
          <Camera className="w-4 h-4 mr-2" />
          Time-lapse
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredMedia.map((item, index) => (
          <div key={index} className="relative group cursor-pointer" onClick={() => handleMediaClick(index)}>
            <div className="aspect-square bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <Media3DPreview type={item.type} source={item.source} />
              </div>
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button variant="secondary" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View 3D
              </Button>
            </div>
            <p className="text-sm font-medium mt-2 text-center">{item.title}</p>
          </div>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[800px] h-[600px] flex flex-col">
          <DialogHeader>
            <DialogTitle>{selectedMedia !== null ? mediaItems[selectedMedia].title : "Media Preview"}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 relative">
            {selectedMedia !== null && (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 rounded-lg">
                <Media3DPreview type={mediaItems[selectedMedia].type} source={mediaItems[selectedMedia].source} />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
            <Button>
              <Heart className="w-4 h-4 mr-2" /> Like
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}