"use client"

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from "recharts"

const radarData = [
  { factor: "Temperature Tolerance", lotus: 85, cherry_blossom: 60, sunflower: 95, lavender: 70 },
  { factor: "Rainfall Dependency", lotus: 90, cherry_blossom: 75, sunflower: 40, lavender: 65 },
  { factor: "Soil Quality", lotus: 70, cherry_blossom: 85, sunflower: 60, lavender: 80 },
  { factor: "Sunlight Hours", lotus: 80, cherry_blossom: 70, sunflower: 100, lavender: 75 },
  { factor: "Humidity Preference", lotus: 95, cherry_blossom: 65, sunflower: 45, lavender: 55 },
  { factor: "Wind Resistance", lotus: 60, cherry_blossom: 40, sunflower: 85, lavender: 70 },
]

interface RadarAnalysisProps {
  selectedSpecies?: string[]
}

export function RadarAnalysis({ selectedSpecies = ["lotus", "cherry_blossom"] }: RadarAnalysisProps) {
  const colors = {
    lotus: "hsl(var(--chart-1))",
    cherry_blossom: "hsl(var(--chart-2))",
    sunflower: "hsl(var(--chart-5))",
    lavender: "hsl(var(--chart-4))",
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={radarData}>
          <PolarGrid className="opacity-30" />
          <PolarAngleAxis dataKey="factor" className="text-xs" tick={{ fontSize: 10 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" tick={{ fontSize: 10 }} />
          {selectedSpecies.map((species) => (
            <Radar
              key={species}
              name={species.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              dataKey={species}
              stroke={colors[species as keyof typeof colors]}
              fill={colors[species as keyof typeof colors]}
              fillOpacity={0.1}
              strokeWidth={2}
            />
          ))}
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
