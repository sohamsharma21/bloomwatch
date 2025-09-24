"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, TrendingUp, Globe, Flower2, Download, FileText, Brain, Target, Zap, AlertCircle } from "lucide-react"
import { SafeComponent } from "@/components/safe-component"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Bloom3DVisualizer } from "@/components/3d-bloom-visualizer"
import { AnimatedBloomCycle } from "@/components/animated-bloom-cycle"
import { MultimediaGallery } from "@/components/multimedia-gallery"
import { CommunityPlatform } from "@/components/community-platform"
import { EconomicAnalysis } from "@/components/economic-analysis"

const mockRegions = [
  {
    id: "asia",
    name: "Asia Pacific",
    activeBlooms: 1247,
    hotspots: [
      { species: "Cherry Blossom", status: "Full Bloom" },
      { species: "Lotus", status: "Budding" },
    ],
  },
  {
    id: "europe",
    name: "Europe",
    activeBlooms: 892,
    hotspots: [
      { species: "Lavender", status: "Full Bloom" },
      { species: "Sunflower", status: "Peak" },
    ],
  },
]

export default function DashboardPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>("all")
  const [selectedSpecies, setSelectedSpecies] = useState<string>("all")
  const [timeRange, setTimeRange] = useState([6]) // Default to June
  const [isLoading, setIsLoading] = useState(false)

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const totalActiveBlooms = mockRegions.reduce((sum, region) => sum + region.activeBlooms, 0)
  const predictedBlooms = Math.round(totalActiveBlooms * 1.15)
  const diversityIndex = 0.87

  const handleExportPDF = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert("PDF report would be generated here!")
    }, 1000)
  }

  const handleExportCSV = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert("CSV data would be exported here!")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80 space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Region Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="region-select">
                    Select Region
                  </label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger id="region-select" aria-label="Select region filter">
                      <SelectValue placeholder="Choose region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      <SelectItem value="asia">Asia</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                      <SelectItem value="africa">Africa</SelectItem>
                      <SelectItem value="americas">Americas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Species Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="species-select">
                    Select Species
                  </label>
                  <Select value={selectedSpecies} onValueChange={setSelectedSpecies}>
                    <SelectTrigger id="species-select" aria-label="Select species filter">
                      <SelectValue placeholder="Choose species" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Species</SelectItem>
                      <SelectItem value="lotus">Lotus</SelectItem>
                      <SelectItem value="cherry_blossom">Cherry Blossom</SelectItem>
                      <SelectItem value="sunflower">Sunflower</SelectItem>
                      <SelectItem value="lavender">Lavender</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Time Slider */}
                <div className="space-y-3">
                  <label className="text-sm font-medium" htmlFor="time-slider">
                    Season: {months[timeRange[0] - 1]}
                  </label>
                  <Slider
                    id="time-slider"
                    value={timeRange}
                    onValueChange={setTimeRange}
                    max={12}
                    min={1}
                    step={1}
                    className="w-full"
                    aria-label="Select season month"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Jan</span>
                    <span>Dec</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-4">
              <Card className="glass">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Blooms</p>
                      <p className="text-2xl font-bold text-primary" aria-label={`${totalActiveBlooms} active blooms`}>
                        {totalActiveBlooms}
                      </p>
                    </div>
                    <Flower2 className="h-8 w-8 text-primary/60" aria-hidden="true" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Predicted Next Month</p>
                      <p
                        className="text-2xl font-bold text-secondary"
                        aria-label={`${predictedBlooms} predicted blooms next month`}
                      >
                        {predictedBlooms}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-secondary/60" aria-hidden="true" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Diversity Index</p>
                      <p className="text-2xl font-bold text-accent" aria-label={`Diversity index: ${diversityIndex}`}>
                        {diversityIndex}
                      </p>
                    </div>
                    <Globe className="h-8 w-8 text-accent/60" aria-hidden="true" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-sm">Export Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handleExportPDF}
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  size="sm"
                  disabled={isLoading}
                  aria-label="Download PDF report"
                >
                  {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : <FileText className="h-4 w-4 mr-2" />}
                  Download Report (PDF)
                </Button>
                <Button
                  onClick={handleExportCSV}
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  size="sm"
                  disabled={isLoading}
                  aria-label="Download CSV data"
                >
                  {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : <Download className="h-4 w-4 mr-2" />}
                  Download Data (CSV)
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Global Overview
                </TabsTrigger>
                <TabsTrigger value="insights" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Data Insights
                </TabsTrigger>
                <TabsTrigger value="3d-visualization" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  3D & VR
                </TabsTrigger>
                <TabsTrigger value="multimedia" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Multimedia
                </TabsTrigger>
                <TabsTrigger value="community" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Community
                </TabsTrigger>
                <TabsTrigger value="predictions" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Bloom Predictions
                </TabsTrigger>
              </TabsList>

              {/* Global Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                <SafeComponent
                  loadingText="Loading interactive map..."
                  errorFallback={
                    <Card className="glass">
                      <CardContent className="p-8 text-center">
                        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Interactive map temporarily unavailable</p>
                      </CardContent>
                    </Card>
                  }
                >
                  <Card className="glass">
                    <CardHeader>
                      <CardTitle>Global Bloom Hotspots</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-96 bg-muted/20 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Interactive map will load here</p>
                      </div>
                    </CardContent>
                  </Card>
                </SafeComponent>

                {/* Active Regions */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Active Bloom Regions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {mockRegions.map((region) => (
                        <div key={region.id} className="p-4 border border-border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold">{region.name}</h3>
                            <Badge variant="secondary" aria-label={`${region.activeBlooms} active blooms`}>
                              {region.activeBlooms} blooms
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            {region.hotspots.map((hotspot, index) => (
                              <div key={index} className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">{hotspot.species}</span>
                                <Badge
                                  variant={hotspot.status === "Full Bloom" ? "default" : "outline"}
                                  className="text-xs"
                                >
                                  {hotspot.status}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Data Insights Tab */}
              <TabsContent value="insights" className="space-y-8">
                <Card className="glass">
                  <CardContent className="p-8 text-center">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Advanced data visualizations will be available here</p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Bloom Predictions Tab */}
              <TabsContent value="predictions" className="space-y-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="glass">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Target className="h-5 w-5 text-primary" />
                        Cherry Blossom Forecast
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">Expected 2 weeks earlier in 2026</p>
                      <div className="flex items-center gap-2">
                        <div className="h-2 bg-muted rounded-full flex-1">
                          <div className="h-2 bg-primary rounded-full w-[87%]"></div>
                        </div>
                        <span className="text-xs text-muted-foreground">87% confidence</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Zap className="h-5 w-5 text-secondary" />
                        Lotus Bloom Peak
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">Shifting towards July globally</p>
                      <div className="flex items-center gap-2">
                        <div className="h-2 bg-muted rounded-full flex-1">
                          <div className="h-2 bg-secondary rounded-full w-[92%]"></div>
                        </div>
                        <span className="text-xs text-muted-foreground">92% confidence</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <TrendingUp className="h-5 w-5 text-accent" />
                        Sunflower Season
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">Extended bloom period expected</p>
                      <div className="flex items-center gap-2">
                        <div className="h-2 bg-muted rounded-full flex-1">
                          <div className="h-2 bg-accent rounded-full w-[78%]"></div>
                        </div>
                        <span className="text-xs text-muted-foreground">78% confidence</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* 3D Visualization Tab */}
              <TabsContent value="3d-visualization" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Bloom3DVisualizer />
                  <AnimatedBloomCycle />
                </div>
                <EconomicAnalysis />
              </TabsContent>

              {/* Multimedia Tab */}
              <TabsContent value="multimedia" className="space-y-6">
                <MultimediaGallery />
              </TabsContent>

              {/* Community Tab */}
              <TabsContent value="community" className="space-y-6">
                <CommunityPlatform />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
