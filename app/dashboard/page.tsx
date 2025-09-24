"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  MapPin, 
  TrendingUp, 
  Globe, 
  Flower2, 
  Download, 
  Brain, 
  Target, 
  Zap, 
  AlertCircle,
  Thermometer,
  Droplets,
  Sun,
  Wind,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Eye,
  Clock
} from "lucide-react"

// Real-time data simulation
const generateRealTimeData = () => {
  const now = new Date()
  const currentHour = now.getHours()
  const currentMonth = now.getMonth() + 1
  
  return {
    timestamp: now.toLocaleString(),
    temperature: 22 + Math.sin(currentHour * 0.5) * 5 + Math.random() * 2,
    humidity: 65 + Math.sin(currentHour * 0.3) * 10 + Math.random() * 5,
    windSpeed: 8 + Math.sin(currentHour * 0.4) * 3 + Math.random() * 2,
    uvIndex: Math.max(0, 5 + Math.sin(currentHour * 0.2) * 3 + Math.random()),
    activeBlooms: Math.floor(1200 + Math.sin(currentHour * 0.1) * 200 + Math.random() * 100),
    bloomPredictions: Math.floor(800 + Math.sin(currentHour * 0.15) * 150 + Math.random() * 80),
    speciesCount: Math.floor(45 + Math.sin(currentHour * 0.05) * 5 + Math.random() * 3),
    regions: [
      {
        name: "Northern Hemisphere",
        blooms: Math.floor(800 + Math.sin(currentHour * 0.1) * 100),
        status: currentMonth >= 3 && currentMonth <= 6 ? "Peak Season" : "Off Season",
        temperature: 18 + Math.sin(currentHour * 0.3) * 4,
        humidity: 70 + Math.sin(currentHour * 0.2) * 8
      },
      {
        name: "Southern Hemisphere", 
        blooms: Math.floor(400 + Math.sin(currentHour * 0.12) * 80),
        status: currentMonth >= 9 && currentMonth <= 12 ? "Peak Season" : "Off Season",
        temperature: 25 + Math.sin(currentHour * 0.4) * 3,
        humidity: 60 + Math.sin(currentHour * 0.25) * 6
      },
      {
        name: "Equatorial Regions",
        blooms: Math.floor(300 + Math.sin(currentHour * 0.08) * 50),
        status: "Year Round",
        temperature: 28 + Math.sin(currentHour * 0.2) * 2,
        humidity: 80 + Math.sin(currentHour * 0.15) * 5
      }
    ],
    topSpecies: [
      { name: "Cherry Blossom", blooms: 450, trend: "up", peak: "March-April" },
      { name: "Sunflower", blooms: 380, trend: "up", peak: "July-August" },
      { name: "Lavender", blooms: 320, trend: "stable", peak: "June-July" },
      { name: "Lotus", blooms: 280, trend: "up", peak: "May-September" },
      { name: "Rose", blooms: 250, trend: "stable", peak: "April-October" }
    ],
    alerts: [
      { type: "warning", message: "High temperature alert in Mediterranean region", time: "2 min ago" },
      { type: "info", message: "Peak bloom season starting in Northern Europe", time: "15 min ago" },
      { type: "success", message: "New species detected in Amazon region", time: "1 hour ago" }
    ]
  }
}

export default function DashboardPage() {
  const [data, setData] = useState(generateRealTimeData())
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState("realtime")
  const [isLoading, setIsLoading] = useState(false)

  // Update data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateRealTimeData())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => {
      setData(generateRealTimeData())
      setIsLoading(false)
    }, 1000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Peak Season": return "bg-green-500"
      case "Off Season": return "bg-gray-500"
      case "Year Round": return "bg-blue-500"
      default: return "bg-gray-500"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-500" />
      case "down": return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
      default: return <Activity className="w-4 h-4 text-blue-500" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">BloomWatch Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time flower blooming analytics and predictions
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Last updated: {data.timestamp}
            </p>
          </div>
          <div className="flex gap-2">
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="north">Northern Hemisphere</SelectItem>
                <SelectItem value="south">Southern Hemisphere</SelectItem>
                <SelectItem value="equator">Equatorial</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Real-time</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={refreshData} disabled={isLoading}>
              <Zap className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Blooms</CardTitle>
              <Flower2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.activeBlooms.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last hour
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bloom Predictions</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.bloomPredictions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Next 24 hours
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Species Detected</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.speciesCount}</div>
              <p className="text-xs text-muted-foreground">
                Across all regions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Global Coverage</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">
                Monitored regions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Weather Conditions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Thermometer className="w-8 h-8 text-red-500" />
                <div>
                  <p className="text-sm font-medium">Temperature</p>
                  <p className="text-2xl font-bold">{data.temperature.toFixed(1)}°C</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Droplets className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Humidity</p>
                  <p className="text-2xl font-bold">{data.humidity.toFixed(0)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Wind className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Wind Speed</p>
                  <p className="text-2xl font-bold">{data.windSpeed.toFixed(1)} km/h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Sun className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium">UV Index</p>
                  <p className="text-2xl font-bold">{data.uvIndex.toFixed(1)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="regions">Regions</TabsTrigger>
            <TabsTrigger value="species">Species</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Regional Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.regions.map((region, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{region.name}</span>
                          <Badge className={getStatusColor(region.status)}>
                            {region.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{region.blooms} blooms</span>
                          <span>{region.temperature.toFixed(1)}°C</span>
                          <span>{region.humidity.toFixed(0)}% humidity</span>
                        </div>
                        <Progress value={(region.blooms / 1000) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Top Species
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.topSpecies.map((species, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getTrendIcon(species.trend)}
                          <div>
                            <p className="font-medium">{species.name}</p>
                            <p className="text-sm text-muted-foreground">Peak: {species.peak}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{species.blooms}</p>
                          <p className="text-xs text-muted-foreground">blooms</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="regions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.regions.map((region, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{region.name}</span>
                      <Badge className={getStatusColor(region.status)}>
                        {region.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{region.blooms}</div>
                      <p className="text-sm text-muted-foreground">Active Blooms</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <Thermometer className="w-4 h-4 mx-auto mb-1 text-red-500" />
                        <p className="font-medium">{region.temperature.toFixed(1)}°C</p>
                        <p className="text-xs text-muted-foreground">Temperature</p>
                      </div>
                      <div className="text-center">
                        <Droplets className="w-4 h-4 mx-auto mb-1 text-blue-500" />
                        <p className="font-medium">{region.humidity.toFixed(0)}%</p>
                        <p className="text-xs text-muted-foreground">Humidity</p>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="species" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Species Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.topSpecies.map((species, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                          <Flower2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{species.name}</h3>
                          <p className="text-sm text-muted-foreground">Peak season: {species.peak}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold">{species.blooms}</p>
                          <p className="text-xs text-muted-foreground">active blooms</p>
                        </div>
                        {getTrendIcon(species.trend)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.alerts.map((alert, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === 'warning' ? 'bg-yellow-500' :
                        alert.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium">{alert.message}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {alert.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}