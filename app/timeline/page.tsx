"use client"

import { useState, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Calendar, MapPin, Flower2 } from "lucide-react"
import { timeline, species } from "@/lib/data"
import { Footer } from "@/components/footer"

interface TimelineEvent {
  month: string
  event: string
  species?: string
  region?: string
  description?: string
}

export default function TimelinePage() {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const months = [
    { name: "January", short: "Jan", events: [] },
    { name: "February", short: "Feb", events: [] },
    { name: "March", short: "Mar", events: timeline.filter((e) => e.month === "March") },
    { name: "April", short: "Apr", events: [] },
    { name: "May", short: "May", events: timeline.filter((e) => e.month === "May") },
    { name: "June", short: "Jun", events: [] },
    { name: "July", short: "Jul", events: timeline.filter((e) => e.month === "July") },
    { name: "August", short: "Aug", events: timeline.filter((e) => e.month === "August") },
    { name: "September", short: "Sep", events: [] },
    { name: "October", short: "Oct", events: [] },
    { name: "November", short: "Nov", events: [] },
    { name: "December", short: "Dec", events: [] },
  ]

  // Enhanced timeline events with more details
  const enhancedEvents = [
    {
      month: "March",
      event: "Cherry Blossoms in Japan",
      species: "Cherry Blossom",
      region: "Japan",
      description: "The iconic sakura season begins across Japan, starting in southern regions and moving north.",
      color: "bg-pink-100 border-pink-300 dark:bg-pink-900/20 dark:border-pink-700",
    },
    {
      month: "May",
      event: "Lavender Fields in France",
      species: "Lavender",
      region: "France",
      description: "Provence's lavender fields reach their peak bloom, creating stunning purple landscapes.",
      color: "bg-purple-100 border-purple-300 dark:bg-purple-900/20 dark:border-purple-700",
    },
    {
      month: "July",
      event: "Lotus Bloom in India",
      species: "Lotus",
      region: "India",
      description: "Sacred lotus flowers bloom across India's wetlands and temple ponds.",
      color: "bg-blue-100 border-blue-300 dark:bg-blue-900/20 dark:border-blue-700",
    },
    {
      month: "August",
      event: "Sunflowers in Italy",
      species: "Sunflower",
      region: "Italy",
      description: "Tuscany's sunflower fields reach their golden peak, attracting visitors worldwide.",
      color: "bg-yellow-100 border-yellow-300 dark:bg-yellow-900/20 dark:border-yellow-700",
    },
  ]

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const getSpeciesIcon = (speciesName: string) => {
    const speciesData = species.find((s) => s.name === speciesName)
    return speciesData?.image || "/placeholder.svg"
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-primary">Phenology</span> Timeline
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow the natural rhythm of flowering seasons around the world. Explore when and where different species
            reach their peak bloom throughout the year.
          </p>
        </div>

        {/* Timeline Navigation */}
        <div className="relative mb-8">
          <div className="flex items-center">
            <Button variant="outline" size="icon" onClick={scrollLeft} className="mr-4 shrink-0 bg-transparent">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Horizontal Timeline */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex space-x-6 pb-4 min-w-max">
                {months.map((month, index) => (
                  <div key={month.name} className="flex flex-col items-center min-w-[120px]">
                    {/* Month Circle */}
                    <div
                      className={`w-16 h-16 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                        selectedMonth === month.name
                          ? "bg-primary border-primary text-primary-foreground scale-110"
                          : month.events.length > 0 || enhancedEvents.some((e) => e.month === month.name)
                            ? "bg-secondary/20 border-secondary text-secondary hover:bg-secondary/30"
                            : "bg-muted border-border text-muted-foreground hover:bg-muted/80"
                      }`}
                      onClick={() => setSelectedMonth(selectedMonth === month.name ? null : month.name)}
                    >
                      <span className="text-xs font-semibold">{month.short}</span>
                    </div>

                    {/* Month Label */}
                    <span className="text-sm font-medium mt-2 text-center">{month.name}</span>

                    {/* Event Indicators */}
                    {(month.events.length > 0 || enhancedEvents.some((e) => e.month === month.name)) && (
                      <div className="flex space-x-1 mt-2">
                        {enhancedEvents
                          .filter((e) => e.month === month.name)
                          .map((event, eventIndex) => (
                            <div key={eventIndex} className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          ))}
                      </div>
                    )}

                    {/* Connection Line */}
                    {index < months.length - 1 && (
                      <div className="absolute top-8 left-[calc(50%+60px)] w-6 h-0.5 bg-border" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Button variant="outline" size="icon" onClick={scrollRight} className="ml-4 shrink-0 bg-transparent">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Selected Month Events */}
        {selectedMonth && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              {selectedMonth} Events
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {enhancedEvents
                .filter((event) => event.month === selectedMonth)
                .map((event, index) => (
                  <Card
                    key={index}
                    className={`glass border-2 ${event.color} hover:shadow-lg transition-all duration-300`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Flower2 className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{event.event}</h3>
                          <p className="text-muted-foreground text-sm mb-3">{event.description}</p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="text-xs">
                              <MapPin className="h-3 w-3 mr-1" />
                              {event.region}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {event.species}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* All Events Overview */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Annual Bloom Calendar</h2>
          <div className="grid gap-4">
            {enhancedEvents.map((event, index) => (
              <Card
                key={index}
                className={`glass border-l-4 hover:shadow-lg transition-all duration-300 cursor-pointer ${
                  event.month === "March"
                    ? "border-l-pink-400"
                    : event.month === "May"
                      ? "border-l-purple-400"
                      : event.month === "July"
                        ? "border-l-blue-400"
                        : "border-l-yellow-400"
                }`}
                onClick={() => setSelectedMonth(event.month)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Flower2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{event.event}</h3>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="mb-2">
                        {event.month}
                      </Badge>
                      <div className="flex gap-1">
                        <Badge variant="outline" className="text-xs">
                          <MapPin className="h-3 w-3 mr-1" />
                          {event.region}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Interactive Timeline Visualization */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Seasonal Flow</h2>
          <Card className="glass p-6">
            <div className="relative h-32">
              {/* Seasonal gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-green-200 via-yellow-200 via-orange-200 to-blue-200 dark:from-blue-900/20 dark:via-green-900/20 dark:via-yellow-900/20 dark:via-orange-900/20 dark:to-blue-900/20 rounded-lg opacity-30" />

              {/* Event markers */}
              {enhancedEvents.map((event, index) => {
                const monthIndex = months.findIndex((m) => m.name === event.month)
                const position = (monthIndex / 11) * 100

                return (
                  <div
                    key={index}
                    className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer group"
                    style={{ left: `${position}%` }}
                    onClick={() => setSelectedMonth(event.month)}
                  >
                    <div className="w-4 h-4 rounded-full bg-primary border-2 border-background shadow-lg group-hover:scale-125 transition-transform" />
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-popover border border-border rounded-lg p-2 shadow-lg whitespace-nowrap">
                        <p className="text-xs font-medium">{event.species}</p>
                        <p className="text-xs text-muted-foreground">{event.region}</p>
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Season labels */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-between text-xs text-muted-foreground">
                <span>Winter</span>
                <span>Spring</span>
                <span>Summer</span>
                <span>Autumn</span>
                <span>Winter</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
