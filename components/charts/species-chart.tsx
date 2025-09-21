"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface Species {
  id: string
  name: string
  image: string
  season: string[]
  description: string
}

interface SpeciesChartProps {
  species: Species
}

export function SpeciesChart({ species }: SpeciesChartProps) {
  // Create bloom intensity data for each month
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const fullMonthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const data = months.map((month, index) => {
    const fullMonth = fullMonthNames[index]
    const isBloomMonth = species.season.includes(fullMonth)

    // Create a bloom intensity pattern
    let intensity = 0
    if (isBloomMonth) {
      const seasonIndex = species.season.indexOf(fullMonth)
      const totalSeasons = species.season.length

      // Create a bell curve pattern for bloom intensity
      if (totalSeasons === 1) {
        intensity = 100
      } else {
        const middle = (totalSeasons - 1) / 2
        const distance = Math.abs(seasonIndex - middle)
        intensity = Math.max(60, 100 - distance * 20)
      }
    }

    return {
      month,
      intensity,
      isBloom: isBloomMonth,
    }
  })

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis dataKey="month" className="text-xs" tick={{ fontSize: 12 }} />
        <YAxis className="text-xs" tick={{ fontSize: 12 }} domain={[0, 100]} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
          formatter={(value: number, name: string) => [`${value}%`, "Bloom Intensity"]}
        />
        <Bar dataKey="intensity" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} opacity={0.8} />
      </BarChart>
    </ResponsiveContainer>
  )
}
