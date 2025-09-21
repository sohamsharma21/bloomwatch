"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Mock comparison data for different species
const comparisonData = [
  { month: "Jan", lotus: 5, cherry_blossom: 0, sunflower: 0, lavender: 0 },
  { month: "Feb", lotus: 8, cherry_blossom: 2, sunflower: 0, lavender: 0 },
  { month: "Mar", lotus: 15, cherry_blossom: 45, sunflower: 0, lavender: 5 },
  { month: "Apr", lotus: 25, cherry_blossom: 80, sunflower: 10, lavender: 20 },
  { month: "May", lotus: 40, cherry_blossom: 60, sunflower: 25, lavender: 70 },
  { month: "Jun", lotus: 70, cherry_blossom: 20, sunflower: 50, lavender: 90 },
  { month: "Jul", lotus: 100, cherry_blossom: 5, sunflower: 85, lavender: 95 },
  { month: "Aug", lotus: 95, cherry_blossom: 0, sunflower: 100, lavender: 70 },
  { month: "Sep", lotus: 60, cherry_blossom: 0, sunflower: 80, lavender: 30 },
  { month: "Oct", lotus: 30, cherry_blossom: 0, sunflower: 40, lavender: 10 },
  { month: "Nov", lotus: 15, cherry_blossom: 0, sunflower: 10, lavender: 0 },
  { month: "Dec", lotus: 8, cherry_blossom: 0, sunflower: 0, lavender: 0 },
]

interface ComparisonChartProps {
  species: string[]
}

export function ComparisonChart({ species }: ComparisonChartProps) {
  const colors = {
    lotus: "#d97706",
    cherry_blossom: "#a21caf",
    sunflower: "#eab308",
    lavender: "#7c3aed",
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={comparisonData}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis dataKey="month" className="text-xs" tick={{ fontSize: 12 }} />
        <YAxis className="text-xs" tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
        />
        <Legend />
        {species.map((speciesName) => (
          <Line
            key={speciesName}
            type="monotone"
            dataKey={speciesName}
            stroke={colors[speciesName as keyof typeof colors]}
            strokeWidth={2}
            dot={{ r: 4 }}
            name={speciesName.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
