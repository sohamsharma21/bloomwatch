"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const timelineData = [
  {
    species: "Cherry Blossom",
    regions: [
      { name: "Japan", start: 2, end: 4, intensity: "high" },
      { name: "Korea", start: 3, end: 5, intensity: "medium" },
      { name: "USA West", start: 3, end: 4, intensity: "medium" },
    ],
  },
  {
    species: "Lotus",
    regions: [
      { name: "India", start: 5, end: 8, intensity: "high" },
      { name: "China", start: 6, end: 9, intensity: "high" },
      { name: "Thailand", start: 4, end: 7, intensity: "medium" },
    ],
  },
  {
    species: "Sunflower",
    regions: [
      { name: "Italy", start: 6, end: 9, intensity: "high" },
      { name: "Ukraine", start: 7, end: 9, intensity: "high" },
      { name: "Kansas", start: 7, end: 8, intensity: "medium" },
    ],
  },
  {
    species: "Lavender",
    regions: [
      { name: "Provence", start: 5, end: 7, intensity: "high" },
      { name: "Bulgaria", start: 6, end: 8, intensity: "medium" },
      { name: "Tasmania", start: 11, end: 1, intensity: "medium" },
    ],
  },
]

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function TimelineGantt() {
  const [selectedYear, setSelectedYear] = useState(2025)

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "high":
        return "bg-primary"
      case "medium":
        return "bg-secondary"
      case "low":
        return "bg-accent"
      default:
        return "bg-muted"
    }
  }

  const getBarWidth = (start: number, end: number) => {
    if (end >= start) {
      return ((end - start + 1) / 12) * 100
    } else {
      // Handle year wrap (e.g., Nov to Jan)
      return ((12 - start + end + 1) / 12) * 100
    }
  }

  const getBarPosition = (start: number) => {
    return ((start - 1) / 12) * 100
  }

  return (
    <div className="space-y-4">
      {/* Year selector */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Global Bloom Timeline</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setSelectedYear((prev) => prev - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-medium px-3">{selectedYear}</span>
          <Button variant="outline" size="sm" onClick={() => setSelectedYear((prev) => prev + 1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Timeline header */}
      <div className="grid grid-cols-13 gap-1 text-xs text-muted-foreground">
        <div className="col-span-1"></div>
        {months.map((month) => (
          <div key={month} className="text-center font-medium">
            {month}
          </div>
        ))}
      </div>

      {/* Timeline rows */}
      <div className="space-y-3">
        {timelineData.map((species) => (
          <div key={species.species} className="space-y-2">
            <h4 className="font-medium text-sm">{species.species}</h4>
            {species.regions.map((region) => (
              <div key={region.name} className="grid grid-cols-13 gap-1 items-center">
                <div className="col-span-1 text-xs text-muted-foreground text-right pr-2">{region.name}</div>
                <div className="col-span-12 relative h-6 bg-muted/30 rounded">
                  <div
                    className={`absolute h-full rounded ${getIntensityColor(region.intensity)} flex items-center justify-center`}
                    style={{
                      left: `${getBarPosition(region.start)}%`,
                      width: `${getBarWidth(region.start, region.end)}%`,
                    }}
                  >
                    <Badge variant="secondary" className="text-xs bg-white/20 text-white border-0">
                      {region.intensity}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded"></div>
          <span>High Intensity</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-secondary rounded"></div>
          <span>Medium Intensity</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-accent rounded"></div>
          <span>Low Intensity</span>
        </div>
      </div>
    </div>
  )
}
