"use client"

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

const scatterData = [
  { temperature: 15, rainfall: 120, blooms: 45, species: "Cherry Blossom", region: "Asia" },
  { temperature: 22, rainfall: 80, blooms: 85, species: "Lotus", region: "Asia" },
  { temperature: 28, rainfall: 60, blooms: 95, species: "Sunflower", region: "Europe" },
  { temperature: 18, rainfall: 100, blooms: 70, species: "Lavender", region: "Europe" },
  { temperature: 25, rainfall: 45, blooms: 60, species: "Sunflower", region: "Americas" },
  { temperature: 20, rainfall: 90, blooms: 55, species: "Cherry Blossom", region: "Americas" },
  { temperature: 30, rainfall: 30, blooms: 40, species: "Lotus", region: "Africa" },
  { temperature: 16, rainfall: 110, blooms: 75, species: "Lavender", region: "Europe" },
]

export function InteractiveScatter() {
  const getSpeciesColor = (species: string) => {
    const colors = {
      "Cherry Blossom": "hsl(var(--chart-2))",
      Lotus: "hsl(var(--chart-1))",
      Sunflower: "hsl(var(--chart-5))",
      Lavender: "hsl(var(--chart-4))",
    }
    return colors[species as keyof typeof colors] || "hsl(var(--chart-3))"
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart data={scatterData}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis
            dataKey="temperature"
            name="Temperature (°C)"
            className="text-xs"
            tick={{ fontSize: 12 }}
            label={{ value: "Temperature (°C)", position: "insideBottom", offset: -10 }}
          />
          <YAxis
            dataKey="rainfall"
            name="Rainfall (mm)"
            className="text-xs"
            tick={{ fontSize: 12 }}
            label={{ value: "Rainfall (mm)", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
            formatter={(value, name, props) => {
              if (name === "blooms") {
                return [`${value} blooms`, `${props.payload.species} in ${props.payload.region}`]
              }
              return [value, name]
            }}
          />
          <Scatter dataKey="blooms" name="Bloom Count">
            {scatterData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getSpeciesColor(entry.species)} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
