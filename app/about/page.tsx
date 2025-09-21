import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Satellite,
  Globe,
  BarChart3,
  Users,
  Award,
  ExternalLink,
  Flower2,
  Calendar,
  MapPin,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  const challengeInfo = {
    difficulty: "Advanced",
    subjects: ["Earth Science", "Data Visualization", "Climate Change", "Phenology", "Remote Sensing"],
  }

  const teamMembers = [
    { name: "Soham Sharma", role: "Data Analyst & Full Stack Developer", expertise: "AI Expertise & Development" },
    { name: "Sarthak Singh", role: "Research Specialist", expertise: "Research & Documentation" },
    { name: "Dev", role: "Frontend Developer", expertise: "Frontend Development & UI/UX" },
  ]

  const features = [
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Monitor flowering patterns across all continents using satellite data",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Sophisticated charts and correlations with climate factors",
    },
    {
      icon: Calendar,
      title: "Temporal Tracking",
      description: "Follow seasonal changes and predict future bloom patterns",
    },
    {
      icon: MapPin,
      title: "Interactive Maps",
      description: "Explore bloom hotspots with detailed regional information",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Flower2 className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold">
              About <span className="text-primary">BloomWatch</span>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding the intricate patterns of nature through cutting-edge Earth observation technology and the
            science of phenology.
          </p>
        </div>

        {/* What is Phenology */}
        <section className="mb-16">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Satellite className="h-6 w-6 text-primary" />
                What is Phenology?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-muted-foreground">
                Phenology is the study of cyclic and seasonal natural phenomena, especially in relation to climate and
                plant and animal life. It's one of nature's most sensitive indicators of climate change.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-secondary" />
                    Why It Matters
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Tracks ecosystem responses to climate change</li>
                    <li>• Helps predict agricultural timing and yields</li>
                    <li>• Monitors biodiversity and species migration</li>
                    <li>• Informs conservation and management strategies</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-accent" />
                    Global Impact
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Affects food security worldwide</li>
                    <li>• Influences pollinator populations</li>
                    <li>• Impacts tourism and cultural events</li>
                    <li>• Guides climate adaptation strategies</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Platform Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="glass hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* NASA Space Apps Challenge */}
        <section className="mb-16">
          <Card className="glass border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Award className="h-6 w-6 text-primary" />
                NASA Space Apps Challenge
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-muted-foreground">
                BloomWatch was developed as part of the NASA Space Apps Challenge, a global hackathon that brings
                together teams to solve challenges using NASA's open data.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-3">Challenge Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Difficulty:</span>
                      <Badge
                        variant={challengeInfo.difficulty === "Advanced" ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {challengeInfo.difficulty}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground mb-2 block">Subjects:</span>
                      <div className="flex flex-wrap gap-1">
                        {challengeInfo.subjects.map((subject, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Our Approach</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Leveraged NASA Earth observation data</li>
                    <li>• Created intuitive data visualizations</li>
                    <li>• Built responsive, accessible interface</li>
                    <li>• Focused on global phenology patterns</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <Button asChild variant="outline">
                  <Link href="https://spaceappschallenge.org" target="_blank" rel="noopener noreferrer">
                    Learn More About Space Apps
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            Our Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="glass hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.expertise}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-16">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-2xl">Technology & Data Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-3">Frontend Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js", "React", "TypeScript", "Tailwind CSS", "Recharts"].map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Data Sources</h3>
                  <div className="flex flex-wrap gap-2">
                    {["NASA Earth Data", "MODIS", "Landsat", "Climate Data", "Phenology Networks"].map((source) => (
                      <Badge key={source} variant="outline" className="text-xs">
                        {source}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  This application uses demo data for visualization purposes. In a production environment, it would
                  integrate with real-time NASA Earth observation APIs.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="https://earthdata.nasa.gov" target="_blank" rel="noopener noreferrer">
                    Explore NASA Earth Data
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="glass p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Explore?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Dive into the fascinating world of global flowering patterns and discover how nature responds to our
              changing climate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/explorer">Explore Species</Link>
              </Button>
            </div>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  )
}
