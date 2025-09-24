"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Image, Video, Camera, Upload, Play, Download, Share2, Heart, Eye, Move3d } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

function Media3DPreview({ type, source, title }: { type: string; source: string; title: string }) {
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
        // Draw photo frame with actual image
        ctx.fillStyle = '#8B4513'
        ctx.fillRect(centerX - 40, centerY - 30, 80, 60)
        ctx.fillStyle = '#87CEEB'
        ctx.fillRect(centerX - 35, centerY - 25, 70, 50)
        
        // Try to load actual image
        const img = document.createElement('img')
        img.crossOrigin = "anonymous"
        img.onload = function() {
          ctx.drawImage(img, centerX - 35, centerY - 25, 70, 50)
        }
        img.onerror = function() {
          // Fallback to colored rectangle
          ctx.fillStyle = '#FF69B4'
          ctx.fillRect(centerX - 30, centerY - 20, 60, 40)
        }
        img.src = source
      } else if (type === "video") {
        // Video preview with play button
        ctx.fillStyle = '#32CD32'
        ctx.fillRect(centerX - 30, centerY - 20, 60, 40)
        
        // Play button
        ctx.fillStyle = '#FFFFFF'
        ctx.beginPath()
        ctx.moveTo(centerX - 5, centerY - 8)
        ctx.lineTo(centerX - 5, centerY + 8)
        ctx.lineTo(centerX + 8, centerY)
        ctx.closePath()
        ctx.fill()
        
        // Video title
        ctx.fillStyle = '#000000'
        ctx.font = '10px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(title.substring(0, 15), centerX, centerY + 25)
      } else if (type === "timelapse") {
        // Time-lapse preview
        ctx.fillStyle = '#FF6347'
        ctx.fillRect(centerX - 25, centerY - 15, 50, 30)
        
        // Time progression bars
        for (let i = 0; i < 5; i++) {
          const x = centerX - 20 + i * 10
          const height = 10 + Math.sin(time + i) * 5
          ctx.fillStyle = `hsl(${120 + i * 20}, 70%, 50%)`
          ctx.fillRect(x, centerY - height/2, 8, height)
        }
        
        // Time-lapse label
        ctx.fillStyle = '#FFFFFF'
        ctx.font = '8px Arial'
        ctx.textAlign = 'center'
        ctx.fillText('TIMELAPSE', centerX, centerY + 20)
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [type, source, title])

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
    { 
      type: "photo", 
      title: "Spring Cherry Blossoms", 
      source: "/pink-cherry-blossom-tree-in-spring.jpg",
      description: "Beautiful cherry blossoms in full bloom during spring season",
      date: "March 2024",
      location: "Tokyo, Japan"
    },
    { 
      type: "photo", 
      title: "Summer Sunflowers", 
      source: "/bright-yellow-sunflower-field.jpg",
      description: "Vast field of golden sunflowers under bright summer sky",
      date: "July 2024",
      location: "Tuscany, Italy"
    },
    { 
      type: "photo", 
      title: "Autumn Lotus", 
      source: "/beautiful-pink-lotus-flower-in-pond.jpg",
      description: "Serene pink lotus flowers floating in peaceful pond",
      date: "September 2024",
      location: "Kyoto, Japan"
    },
    { 
      type: "photo", 
      title: "Lavender Fields", 
      source: "/purple-lavender-field-in-provence.jpg",
      description: "Endless purple lavender fields in Provence countryside",
      date: "June 2024",
      location: "Provence, France"
    },
    { 
      type: "video", 
      title: "Cherry Blossom Time-lapse", 
      source: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      description: "Time-lapse of cherry blossoms blooming over 3 days",
      date: "March 2024",
      location: "Washington DC, USA"
    },
    { 
      type: "video", 
      title: "Sunflower Field Sunrise", 
      source: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
      description: "Sunrise time-lapse over sunflower field",
      date: "July 2024",
      location: "Kansas, USA"
    },
    { 
      type: "timelapse", 
      title: "Flower Growth Cycle", 
      source: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
      description: "Complete growth cycle from seed to bloom",
      date: "April 2024",
      location: "Research Lab, Netherlands"
    },
    { 
      type: "timelapse", 
      title: "Tulip Field Blooming", 
      source: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_10mb.mp4",
      description: "Tulip fields blooming in spring",
      date: "April 2024",
      location: "Keukenhof, Netherlands"
    },
    { 
      type: "photo", 
      title: "Rose Garden", 
      source: "/placeholder.jpg",
      description: "Colorful rose garden in full bloom",
      date: "May 2024",
      location: "Portland, USA"
    },
    { 
      type: "video", 
      title: "Butterfly Garden", 
      source: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_30mb.mp4",
      description: "Butterflies visiting various flowers",
      date: "June 2024",
      location: "Costa Rica"
    }
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
              {item.type === "photo" ? (
                <img 
                  src={item.source} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement
                    if (fallback) fallback.style.display = 'flex'
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Media3DPreview type={item.type} source={item.source} title={item.title} />
                </div>
              )}
              <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full mb-2 animate-pulse"></div>
                  <p className="text-sm font-medium">Photo Preview</p>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button variant="secondary" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
            <div className="mt-2">
              <p className="text-sm font-medium text-center">{item.title}</p>
              <p className="text-xs text-muted-foreground text-center">{item.location}</p>
              <p className="text-xs text-muted-foreground text-center">{item.date}</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[800px] h-[600px] flex flex-col">
          <DialogHeader>
            <DialogTitle>{selectedMedia !== null ? mediaItems[selectedMedia].title : "Media Preview"}</DialogTitle>
            {selectedMedia !== null && (
              <div className="text-sm text-muted-foreground">
                <p>{mediaItems[selectedMedia].description}</p>
                <p className="mt-1">📍 {mediaItems[selectedMedia].location} • 📅 {mediaItems[selectedMedia].date}</p>
              </div>
            )}
          </DialogHeader>
          <div className="flex-1 relative">
            {selectedMedia !== null && (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 rounded-lg">
                {mediaItems[selectedMedia].type === "photo" ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={mediaItems[selectedMedia].source} 
                      alt={mediaItems[selectedMedia].title}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement
                        if (fallback) fallback.style.display = 'flex'
                      }}
                    />
                    <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full mb-4 animate-pulse"></div>
                        <p className="text-lg font-medium">Photo Preview</p>
                        <p className="text-sm text-muted-foreground">{mediaItems[selectedMedia].title}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-200 to-blue-200 rounded-lg">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-400 rounded-full mb-4 animate-pulse flex items-center justify-center">
                        <Play className="w-16 h-16 text-white" />
                      </div>
                      <p className="text-lg font-medium">{mediaItems[selectedMedia].type === "video" ? "Video Preview" : "Time-lapse Preview"}</p>
                      <p className="text-sm text-muted-foreground">{mediaItems[selectedMedia].title}</p>
                      <p className="text-xs text-muted-foreground mt-2">Click play to view</p>
                    </div>
                  </div>
                )}
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