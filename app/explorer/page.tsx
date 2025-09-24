"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Search, Calendar, MapPin, Info, Filter, BarChart3 } from "lucide-react"
import { species } from "@/lib/data"
import { SpeciesChart } from "@/components/charts/species-chart"
import Image from "next/image"
import { Footer } from "@/components/footer"

interface Species {
  id: string
  name: string
  image: string
  season: string[]
  description: string
}

export default function ExplorerPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [seasonFilter, setSeasonFilter] = useState("all")
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredSpecies = species.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSeason = seasonFilter === "all" || s.season.includes(seasonFilter)

    return matchesSearch && matchesSeason
  })

  const handleSpeciesClick = (speciesItem: Species) => {
    setSelectedSpecies(speciesItem)
    setIsModalOpen(true)
  }

  const getSeasonColor = (season: string) => {
    const seasonColors: Record<string, string> = {
      March: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      April: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      May: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      June: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      July: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
      August: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
      September: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    }
    return seasonColors[season] || "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
  }

  const getBloomDensity = (speciesId: string) => {
    const densityMap: Record<string, number> = {
      lotus: 85,
      cherry_blossom: 92,
      sunflower: 78,
      lavender: 88,
    }
    return densityMap[speciesId] || 75
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-primary">Bloom</span> Explorer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the fascinating world of flowering species from around the globe. Click on any species to learn
            more about their blooming patterns and characteristics.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search species by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Season Filter */}
            <div className="md:w-48">
              <Select value={seasonFilter} onValueChange={setSeasonFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Seasons</SelectItem>
                  <SelectItem value="March">March</SelectItem>
                  <SelectItem value="April">April</SelectItem>
                  <SelectItem value="May">May</SelectItem>
                  <SelectItem value="June">June</SelectItem>
                  <SelectItem value="July">July</SelectItem>
                  <SelectItem value="August">August</SelectItem>
                  <SelectItem value="September">September</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-muted-foreground text-center">
            Showing {filteredSpecies.length} of {species.length} species
            {seasonFilter !== "all" && ` blooming in ${seasonFilter}`}
          </div>
        </div>

        {/* Species Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSpecies.map((speciesItem) => (
            <Card
              key={speciesItem.id}
              className="glass hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden"
              onClick={() => handleSpeciesClick(speciesItem)}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={speciesItem.image || "/placeholder.svg"}
                  alt={speciesItem.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-semibold text-lg mb-1">{speciesItem.name}</h3>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{speciesItem.description}</p>

                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Bloom Density</span>
                    <span className="font-medium">{getBloomDensity(speciesItem.id)}%</span>
                  </div>
                  <Progress value={getBloomDensity(speciesItem.id)} className="h-2" />
                </div>

                <div className="flex flex-wrap gap-1">
                  {speciesItem.season.map((season) => (
                    <Badge key={season} variant="secondary" className={`text-xs ${getSeasonColor(season)}`}>
                      {season}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredSpecies.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No species found matching your criteria.</p>
              <p className="text-sm">Try adjusting your search terms or season filter.</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSeasonFilter("all")
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Species Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedSpecies && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  <Info className="h-6 w-6 text-primary" />
                  {selectedSpecies.name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Species Image */}
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={selectedSpecies.image || "/placeholder.svg"}
                    alt={selectedSpecies.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    Description
                  </h3>
                  <p className="text-muted-foreground">{selectedSpecies.description}</p>
                </div>

                {/* Blooming Season */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    Blooming Season
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSpecies.season.map((season) => (
                      <Badge key={season} variant="secondary" className={`${getSeasonColor(season)}`}>
                        {season}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    Bloom Density Analysis
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Current Density</span>
                      <span className="font-medium">{getBloomDensity(selectedSpecies.id)}%</span>
                    </div>
                    <Progress value={getBloomDensity(selectedSpecies.id)} className="h-3" />
                    <p className="text-xs text-muted-foreground">
                      Based on satellite observations and field reports from active bloom regions.
                    </p>
                  </div>
                </div>

                {/* Bloom Pattern Chart */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Bloom Pattern Timeline
                  </h3>
                  <div className="h-64 bg-muted/30 rounded-lg p-4">
                    <SpeciesChart species={selectedSpecies} />
                  </div>
                </div>

                {/* Additional Info */}
                <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Peak Season</h4>
                    <p className="font-semibold">
                      {selectedSpecies.season.length > 0
                        ? selectedSpecies.season[Math.floor(selectedSpecies.season.length / 2)]
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Duration</h4>
                    <p className="font-semibold">{selectedSpecies.season.length} months</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Climate</h4>
                    <p className="font-semibold">Temperate</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Global Coverage</h4>
                    <p className="font-semibold">{getBloomDensity(selectedSpecies.id) > 80 ? "High" : "Moderate"}</p>
                  </div>
                </div>

                {/* Close Button */}
                <div className="flex justify-end pt-4">
                  <Button onClick={() => setIsModalOpen(false)}>Close</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>


      <Footer />
    </div>
  )
}
