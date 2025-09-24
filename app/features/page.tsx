"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Play, Image, Users, TrendingUp } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Advanced <span className="text-primary">BloomWatch</span> Features
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore cutting-edge features designed for NASA Space Apps Challenge including 
            3D visualization, VR support, multimedia galleries, community collaboration, and economic analysis.
          </p>
        </div>

        {/* Features Tabs */}
        <Tabs defaultValue="3d-vr" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="3d-vr" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              3D & VR
            </TabsTrigger>
            <TabsTrigger value="animations" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Animations
            </TabsTrigger>
            <TabsTrigger value="multimedia" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Multimedia
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Community
            </TabsTrigger>
            <TabsTrigger value="economics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Economics
            </TabsTrigger>
          </TabsList>

          {/* 3D & VR Tab */}
          <TabsContent value="3d-vr" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">3D Visualization & Virtual Reality</h2>
              <p className="text-muted-foreground">
                Immersive 3D plant models with VR support for enhanced bloom exploration
              </p>
            </div>
            <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full mb-4 animate-pulse"></div>
                <p className="text-lg font-medium">3D Bloom Visualizer</p>
                <p className="text-sm text-muted-foreground">Interactive 3D plant models</p>
                <p className="text-xs text-muted-foreground mt-2">Coming Soon: Real 3D models with Three.js</p>
              </div>
            </div>
          </TabsContent>

          {/* Animations Tab */}
          <TabsContent value="animations" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Animated Bloom Cycles</h2>
              <p className="text-muted-foreground">
                Interactive animations showing complete plant life cycles with educational content
              </p>
            </div>
            <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-pink-400 rounded-full mb-4 animate-bounce"></div>
                <p className="text-lg font-medium">Plant Growth Animation</p>
                <p className="text-sm text-muted-foreground">Realistic life cycle animations</p>
                <p className="text-xs text-muted-foreground mt-2">Coming Soon: Canvas-based animations</p>
              </div>
            </div>
          </TabsContent>

          {/* Multimedia Tab */}
          <TabsContent value="multimedia" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Multimedia Gallery</h2>
              <p className="text-muted-foreground">
                Comprehensive collection of photos, videos, and time-lapse recordings from global bloom events
              </p>
            </div>
            <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mb-4 animate-pulse"></div>
                <p className="text-lg font-medium">Media Gallery</p>
                <p className="text-sm text-muted-foreground">Photos, videos & time-lapses</p>
                <p className="text-xs text-muted-foreground mt-2">Coming Soon: Interactive media viewer</p>
              </div>
            </div>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Community Platform</h2>
              <p className="text-muted-foreground">
                Connect with researchers, share findings, and collaborate on global phenology research
              </p>
            </div>
            <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-400 rounded-full mb-4 animate-pulse"></div>
                <p className="text-lg font-medium">Community Hub</p>
                <p className="text-sm text-muted-foreground">Research collaboration platform</p>
                <p className="text-xs text-muted-foreground mt-2">Coming Soon: Discussion forums & blogs</p>
              </div>
            </div>
          </TabsContent>

          {/* Economics Tab */}
          <TabsContent value="economics" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Economic Analysis</h2>
              <p className="text-muted-foreground">
                Market trends, crop yield predictions, and economic impact assessment of bloom patterns
              </p>
            </div>
            <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full mb-4 animate-pulse"></div>
                <p className="text-lg font-medium">Economic Dashboard</p>
                <p className="text-sm text-muted-foreground">Market analysis & predictions</p>
                <p className="text-xs text-muted-foreground mt-2">Coming Soon: Real-time economic data</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* NASA Challenge Alignment */}
        <div className="mt-16 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">NASA Space Apps Challenge Alignment</h3>
            <p className="text-muted-foreground mb-6">
              These features specifically address the challenge requirements for global flowering phenology tracking
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium">Virtual Reality</h4>
                <p className="text-xs text-muted-foreground">Immersive exploration</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Play className="h-6 w-6 text-secondary" />
                </div>
                <h4 className="font-medium">Animation</h4>
                <p className="text-xs text-muted-foreground">Dynamic visualizations</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Image className="h-6 w-6 text-accent" />
                </div>
                <h4 className="font-medium">Arts & Multimedia</h4>
                <p className="text-xs text-muted-foreground">Rich media content</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium">Communication</h4>
                <p className="text-xs text-muted-foreground">Global collaboration</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}