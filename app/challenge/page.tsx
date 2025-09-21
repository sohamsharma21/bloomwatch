"use client"

import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Footer } from "@/components/footer"
import { LearningCenter } from "@/components/learning-center"
import { Rocket, Target, Users, Globe, Satellite, Award, ExternalLink, Calendar, MapPin, Lightbulb } from "lucide-react"

export default function ChallengePage() {
  const challengeStats = [
    { label: "Global Participants", value: "47,000+", icon: <Users className="h-5 w-5" /> },
    { label: "Countries", value: "152", icon: <Globe className="h-5 w-5" /> },
    { label: "Local Events", value: "365", icon: <MapPin className="h-5 w-5" /> },
    { label: "Years Running", value: "13", icon: <Calendar className="h-5 w-5" /> },
  ]

  const teamMembers = [
    { name: "Alex Chen", role: "Full-Stack Developer", expertise: "React, Node.js, Data Visualization" },
    { name: "Maria Rodriguez", role: "Data Scientist", expertise: "Machine Learning, Earth Observation" },
    { name: "David Kim", role: "UX Designer", expertise: "User Experience, Interface Design" },
    { name: "Sarah Johnson", role: "NASA Data Specialist", expertise: "Satellite Data, Phenology" },
  ]

  const technologies = [
    "Next.js 15",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Recharts",
    "Leaflet Maps",
    "NASA Earth Data",
    "Satellite Imagery",
    "Machine Learning",
  ]

  const features = [
    {
      title: "Real-time Bloom Tracking",
      description: "Monitor flowering patterns across the globe using NASA satellite data",
      icon: <Satellite className="h-6 w-6" />,
    },
    {
      title: "AI-Powered Predictions",
      description: "Machine learning algorithms predict future bloom patterns and climate impacts",
      icon: <Lightbulb className="h-6 w-6" />,
    },
    {
      title: "Interactive Visualizations",
      description: "Comprehensive charts, maps, and analytics for phenology research",
      icon: <Target className="h-6 w-6" />,
    },
    {
      title: "Global Collaboration",
      description: "Connect researchers and citizen scientists worldwide",
      icon: <Users className="h-6 w-6" />,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Rocket className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold">
              NASA Space Apps <span className="text-primary">Challenge</span>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            BloomWatch was developed for the 2025 NASA Space Apps Challenge, addressing the critical need for global
            flowering phenology monitoring using Earth observation data.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="gap-2">
              <Award className="h-5 w-5" />
              View Project Submission
            </Button>
            <Button variant="outline" size="lg" className="gap-2 bg-transparent">
              <ExternalLink className="h-4 w-4" />
              NASA Space Apps Website
            </Button>
          </div>
        </div>

        {/* Challenge Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {challengeStats.map((stat, index) => (
            <Card key={index} className="glass text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-3 text-primary">{stat.icon}</div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Challenge Overview */}
          <div className="lg:col-span-2 space-y-8">
            {/* Problem Statement */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Challenge: Leveraging NASA Earth Observations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  The challenge was to create an innovative solution that utilizes NASA's Earth observation data to
                  address real-world problems. Our team focused on the critical need for monitoring global flowering
                  phenology patterns to understand climate change impacts on ecosystems.
                </p>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-semibold mb-2 text-primary">Our Approach</h4>
                  <p className="text-sm text-muted-foreground">
                    We developed BloomWatch, a comprehensive platform that combines satellite imagery, machine learning,
                    and interactive visualizations to track and predict flowering patterns worldwide, supporting both
                    scientific research and public engagement.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Key Features */}
            <Card className="glass">
              <CardHeader>
                <CardTitle>Solution Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg text-primary">{feature.icon}</div>
                      <div>
                        <h4 className="font-semibold mb-2">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Technologies Used */}
            <Card className="glass">
              <CardHeader>
                <CardTitle>Technologies & Data Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-3">Development Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-3">NASA Data Sources</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• MODIS Vegetation Indices (NDVI, EVI)</li>
                      <li>• Landsat Surface Reflectance Data</li>
                      <li>• VIIRS Land Surface Phenology</li>
                      <li>• Climate Data from Giovanni</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Our Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <h4 className="font-semibold">{member.name}</h4>
                      <p className="text-sm text-primary mb-2">{member.role}</p>
                      <p className="text-xs text-muted-foreground">{member.expertise}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Challenge Info */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-lg">Challenge Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-1">Event</h4>
                  <p className="text-sm text-muted-foreground">NASA Space Apps Challenge 2025</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Category</h4>
                  <p className="text-sm text-muted-foreground">Leveraging NASA Earth Observations</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Duration</h4>
                  <p className="text-sm text-muted-foreground">48 Hours</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Location</h4>
                  <p className="text-sm text-muted-foreground">Global Virtual Event</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Challenge Brief
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Award className="h-4 w-4 mr-2" />
                    Project Repository
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Learning Center */}
            <LearningCenter />

            {/* Impact Metrics */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-lg">Project Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">335+</div>
                  <div className="text-xs text-muted-foreground">Global Bloom Hotspots Tracked</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">4</div>
                  <div className="text-xs text-muted-foreground">Major Species Monitored</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">87%</div>
                  <div className="text-xs text-muted-foreground">Prediction Accuracy</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="glass text-center">
          <CardContent className="p-8">
            <Rocket className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Join the Mission</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Help us expand BloomWatch's capabilities and contribute to global phenology research. Whether you're a
              developer, scientist, or nature enthusiast, there's a place for you in our community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Users className="h-5 w-5" />
                Join Our Community
              </Button>
              <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                <ExternalLink className="h-4 w-4" />
                Contribute on GitHub
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
