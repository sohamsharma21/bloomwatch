"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Image, Video, Camera, Upload, Play, Download, Share2, Heart, Eye, Move3d } from "lucide-react"

export function MultimediaGallery() {
  const [activeTab, setActiveTab] = useState("photos")
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null)
  const [is3DView, setIs3DView] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  const mediaItems = [
    { 
      type: "photo", 
      title: "Spring Cherry Blossoms", 
      source: "/pink-cherry-blossom-tree-in-spring.jpg",
      location: "Tokyo, Japan",
      date: "March 2024",
      likes: 124,
      description: "Beautiful cherry blossoms in full bloom during spring season"
    },
    { 
      type: "photo", 
      title: "Summer Sunflowers", 
      source: "/bright-yellow-sunflower-field.jpg",
      location: "Tuscany, Italy",
      date: "July 2024",
      likes: 89,
      description: "Golden sunflower field stretching to the horizon"
    },
    { 
      type: "photo", 
      title: "Autumn Lotus", 
      source: "/beautiful-pink-lotus-flower-in-pond.jpg",
      location: "Bangkok, Thailand",
      date: "October 2024",
      likes: 156,
      description: "Pink lotus flowers floating peacefully in the pond"
    },
    { 
      type: "video", 
      title: "Bloom Time-lapse", 
      source: "/timelapse-bloom.mp4",
      location: "Greenhouse Lab",
      date: "November 2024",
      likes: 203,
      description: "24-hour time-lapse of flower blooming process"
    },
    { 
      type: "photo", 
      title: "Lavender Fields", 
      source: "/purple-lavender-field-in-provence.jpg",
      location: "Provence, France",
      date: "June 2024",
      likes: 178,
      description: "Purple lavender fields in the French countryside"
    },
    { 
      type: "video", 
      title: "Pollination Process", 
      source: "/pollination-video.mp4",
      location: "Research Station",
      date: "September 2024",
      likes: 92,
      description: "Close-up view of bee pollination in action"
    },
  ]

  const filteredMedia = mediaItems.filter(item => {
    if (activeTab === "photos") return item.type === "photo"
    if (activeTab === "videos") return item.type === "video"
    if (activeTab === "timelapse") return item.title.toLowerCase().includes("time-lapse")
    return true
  })

  if (!isClient) {
    return (
      <Card className="p-6">
        <div className="h-96 bg-muted/20 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mb-4 animate-pulse"></div>
            <p className="text-sm text-muted-foreground">Loading Gallery...</p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">3D Multimedia Gallery</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIs3DView(!is3DView)}
          >
            <Move3d className="w-4 h-4 mr-2" />
            {is3DView ? "2D View" : "3D View"}
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Upload Media
          </Button>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-4">
        <Button
          variant={activeTab === "photos" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("photos")}
        >
          <Image className="w-4 h-4 mr-2" />
          Photos ({mediaItems.filter(item => item.type === "photo").length})
        </Button>
        <Button
          variant={activeTab === "videos" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("videos")}
        >
          <Video className="w-4 h-4 mr-2" />
          Videos ({mediaItems.filter(item => item.type === "video").length})
        </Button>
        <Button
          variant={activeTab === "timelapse" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("timelapse")}
        >
          <Camera className="w-4 h-4 mr-2" />
          Time-lapse ({mediaItems.filter(item => item.title.toLowerCase().includes("time-lapse")).length})
        </Button>
      </div>
      
      {/* 3D View */}
      {is3DView && (
        <div className="mb-6">
          <div className="text-center mb-4">
            <h4 className="text-lg font-medium">3D Media Visualization</h4>
            <p className="text-sm text-muted-foreground">Interactive 3D previews of your media content</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMedia.slice(0, 4).map((item, index) => (
              <div key={index} className="relative h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    {/* 3D Media Preview */}
                    <div className={`w-20 h-20 rounded-lg mb-4 mx-auto shadow-2xl ${
                      item.type === "video" 
                        ? "bg-gradient-to-br from-red-400 to-pink-400" 
                        : "bg-gradient-to-br from-pink-400 to-purple-400"
                    } ${isClient ? 'animate-pulse' : ''}`}>
                      <div className="w-full h-full flex items-center justify-center">
                        {item.type === "video" ? (
                          <Play className="w-8 h-8 text-white" />
                        ) : (
                          <Image className="w-8 h-8 text-white" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.location}</p>
                  </div>
                </div>
                
                {/* Media Info Overlay */}
                <div className="absolute bottom-2 left-2 bg-black/50 text-white p-2 rounded text-xs">
                  <div className="flex items-center gap-2">
                    <Heart className="w-3 h-3" />
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* 2D Media Grid */}
      {!is3DView && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredMedia.map((item, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center relative">
                  {/* Media Preview */}
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-full mb-2 ${
                      item.type === "video" 
                        ? "bg-gradient-to-br from-red-400 to-pink-400" 
                        : "bg-gradient-to-br from-pink-400 to-purple-400"
                    }`}></div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.location}</p>
                  </div>
                  
                  {/* Play Button for Videos */}
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => setSelectedMedia(index)}>
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Media Info */}
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-red-500" />
                    <span className="text-xs">{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Media Detail Modal */}
      {selectedMedia !== null && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">
                  {filteredMedia[selectedMedia]?.title}
                </h4>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedMedia(null)}
                >
                  Close
                </Button>
              </div>
              
              {/* 3D Preview in Modal */}
              <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-lg mb-4">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className={`w-24 h-24 rounded-lg mb-4 mx-auto shadow-2xl ${
                      filteredMedia[selectedMedia]?.type === "video" 
                        ? "bg-gradient-to-br from-red-400 to-pink-400" 
                        : "bg-gradient-to-br from-pink-400 to-purple-400"
                    } animate-pulse`}>
                      <div className="w-full h-full flex items-center justify-center">
                        {filteredMedia[selectedMedia]?.type === "video" ? (
                          <Play className="w-12 h-12 text-white" />
                        ) : (
                          <Image className="w-12 h-12 text-white" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm font-medium">{filteredMedia[selectedMedia]?.title}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>Location:</strong> {filteredMedia[selectedMedia]?.location}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Date:</strong> {filteredMedia[selectedMedia]?.date}
                </p>
                <p className="text-sm">
                  {filteredMedia[selectedMedia]?.description}
                </p>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  Like ({filteredMedia[selectedMedia]?.likes})
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Upload Section */}
      <div className="mt-6 p-4 border-2 border-dashed border-muted-foreground/25 rounded-lg text-center">
        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-2">Share your bloom observations</p>
        <Button variant="outline" size="sm">
          Upload Photos & Videos
        </Button>
      </div>
    </Card>
  )
}