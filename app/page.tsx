import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Globe, BarChart3, Calendar, Info } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10" />
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
              <span className="text-primary">BloomWatch</span> – Tracking Global{" "}
              <span className="text-secondary">Flowering Phenology</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
              Harnessing NASA Earth observations to monitor seasonal vegetation changes and understand the intricate
              patterns of nature's blooming cycles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/dashboard">
                  Enter Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Explore Nature's Patterns</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the fascinating world of global flowering patterns through interactive visualizations and
              real-time data analysis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 glass hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Global Dashboard</h3>
              <p className="text-muted-foreground text-sm">
                Interactive world map with real-time bloom hotspots and regional insights.
              </p>
            </Card>

            <Card className="p-6 glass hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg mb-4 group-hover:bg-secondary/20 transition-colors">
                <BarChart3 className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Data Analytics</h3>
              <p className="text-muted-foreground text-sm">
                Advanced charts showing seasonal trends and climate correlations.
              </p>
            </Card>

            <Card className="p-6 glass hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4 group-hover:bg-accent/20 transition-colors">
                <Calendar className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Phenology Timeline</h3>
              <p className="text-muted-foreground text-sm">
                Track flowering events across different seasons and regions.
              </p>
            </Card>

            <Card className="p-6 glass hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center justify-center w-12 h-12 bg-chart-3/10 rounded-lg mb-4 group-hover:bg-chart-3/20 transition-colors">
                <Info className="h-6 w-6 text-chart-3" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Species Explorer</h3>
              <p className="text-muted-foreground text-sm">
                Detailed information about different flowering species worldwide.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <Card className="p-12 glass text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join us in understanding the beautiful patterns of nature through cutting-edge Earth observation
              technology.
            </p>
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/dashboard">
                Start Exploring
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
