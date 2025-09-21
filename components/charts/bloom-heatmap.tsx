"use client"

// Mock heatmap data for bloom density by region and month
const heatmapData = [
  { region: "Asia", month: "Jan", density: 20 },
  { region: "Asia", month: "Feb", density: 30 },
  { region: "Asia", month: "Mar", density: 60 },
  { region: "Asia", month: "Apr", density: 85 },
  { region: "Asia", month: "May", density: 95 },
  { region: "Asia", month: "Jun", density: 100 },
  { region: "Europe", month: "Jan", density: 10 },
  { region: "Europe", month: "Feb", density: 15 },
  { region: "Europe", month: "Mar", density: 40 },
  { region: "Europe", month: "Apr", density: 70 },
  { region: "Europe", month: "May", density: 90 },
  { region: "Europe", month: "Jun", density: 85 },
]

export function BloomHeatmap() {
  const regions = ["Asia", "Europe"]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

  const getIntensity = (region: string, month: string) => {
    const data = heatmapData.find((d) => d.region === region && d.month === month)
    return data ? data.density : 0
  }

  const getColor = (intensity: number) => {
    if (intensity >= 80) return "bg-primary"
    if (intensity >= 60) return "bg-primary/80"
    if (intensity >= 40) return "bg-primary/60"
    if (intensity >= 20) return "bg-primary/40"
    return "bg-primary/20"
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-2 text-xs">
        <div></div>
        {months.map((month) => (
          <div key={month} className="text-center font-medium text-muted-foreground">
            {month}
          </div>
        ))}

        {regions.map((region) => (
          <div key={region} className="contents">
            <div className="text-right font-medium text-muted-foreground pr-2">{region}</div>
            {months.map((month) => {
              const intensity = getIntensity(region, month)
              return (
                <div
                  key={`${region}-${month}`}
                  className={`h-8 rounded ${getColor(intensity)} flex items-center justify-center text-xs font-medium text-white cursor-pointer hover:opacity-80 transition-opacity`}
                  title={`${region} - ${month}: ${intensity}% bloom density`}
                >
                  {intensity}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <span>Low</span>
        <div className="flex gap-1">
          <div className="w-4 h-4 bg-primary/20 rounded"></div>
          <div className="w-4 h-4 bg-primary/40 rounded"></div>
          <div className="w-4 h-4 bg-primary/60 rounded"></div>
          <div className="w-4 h-4 bg-primary/80 rounded"></div>
          <div className="w-4 h-4 bg-primary rounded"></div>
        </div>
        <span>High</span>
      </div>
    </div>
  )
}
