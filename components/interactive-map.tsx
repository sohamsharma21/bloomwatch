"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import dynamic from "next/dynamic"

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })
const MarkerClusterGroup = dynamic(() => import("react-leaflet-cluster"), { ssr: false })

interface Hotspot {
  lat: number
  lng: number
  species: string
  status: string
}

interface Region {
  id: string
  name: string
  activeBlooms: number
  hotspots: Hotspot[]
}

interface InteractiveMapProps {
  regions: Region[]
}

export function InteractiveMap({ regions }: InteractiveMapProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Mock world map with hotspot markers
  const allHotspots = regions.flatMap((region) => region.hotspots)

  const createCustomIcon = (status: string) => {
    if (typeof window === "undefined") return null

    const L = require("leaflet")

    const getColor = (status: string) => {
      switch (status) {
        case "Full Bloom":
          return "#d97706" // primary
        case "Peak Bloom":
          return "#a21caf" // secondary
        case "Early Bloom":
          return "#a21caf" // accent
        case "Late Bloom":
          return "#6b7280" // muted
        default:
          return "#6b7280"
      }
    }

    return L.divIcon({
      html: `
        <div class="relative">
          <div class="w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold" 
               style="background-color: ${getColor(status)}">
            🌸
          </div>
          <div class="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse opacity-60" 
               style="background-color: ${getColor(status)}"></div>
        </div>
      `,
      className: "custom-bloom-marker",
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    })
  }

  if (!isClient) {
    return (
      <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-lg overflow-hidden border border-border flex items-center justify-center">
        <div className="text-muted-foreground">Loading interactive map...</div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="relative h-96 rounded-lg overflow-hidden border border-border">
        <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }} className="z-0">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <MarkerClusterGroup>
            {allHotspots.map((hotspot, index) => (
              <Marker
                key={index}
                position={[hotspot.lat, hotspot.lng]}
                icon={createCustomIcon(hotspot.status)}
                eventHandlers={{
                  click: () => setSelectedHotspot(hotspot),
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-sm">{hotspot.species}</h3>
                    <p className="text-xs text-gray-600 mb-2">
                      {hotspot.lat}°, {hotspot.lng}°
                    </p>
                    <Badge variant={hotspot.status === "Full Bloom" ? "default" : "outline"} className="text-xs">
                      {hotspot.status}
                    </Badge>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>

        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border shadow-lg z-10">
          <div className="text-xs font-medium mb-2">Bloom Status</div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span>Full Bloom</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary"></div>
              <span>Peak Bloom</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <span>Early Bloom</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
              <span>Late Bloom</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Hotspot Info */}
      {selectedHotspot && (
        <Card className="mt-4 p-4 glass">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{selectedHotspot.species}</h3>
              <p className="text-sm text-muted-foreground">
                Coordinates: {selectedHotspot.lat}°, {selectedHotspot.lng}°
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Click on map markers to explore bloom hotspots worldwide
              </p>
            </div>
            <Badge variant={selectedHotspot.status === "Full Bloom" ? "default" : "outline"}>
              {selectedHotspot.status}
            </Badge>
          </div>
        </Card>
      )}
    </div>
  )
}
