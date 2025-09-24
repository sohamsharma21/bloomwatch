"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Zap, Cpu, HardDrive, Wifi, Monitor } from "lucide-react"

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    memory: 0,
    cpu: 0,
    network: 0,
    render: 0
  })

  useEffect(() => {
    const updateMetrics = () => {
      // Memory usage (simulated)
      if ('memory' in performance) {
        const memory = (performance as any).memory
        const used = memory.usedJSHeapSize / memory.jsHeapSizeLimit
        setMetrics(prev => ({ ...prev, memory: Math.round(used * 100) }))
      }

      // CPU usage (simulated based on frame rate)
      let frameCount = 0
      let lastTime = performance.now()
      
      const measureCPU = () => {
        frameCount++
        const currentTime = performance.now()
        
        if (currentTime - lastTime >= 1000) {
          const fps = frameCount
          const cpuUsage = Math.max(0, Math.min(100, 100 - (fps / 60) * 100))
          setMetrics(prev => ({ ...prev, cpu: Math.round(cpuUsage) }))
          frameCount = 0
          lastTime = currentTime
        }
        
        requestAnimationFrame(measureCPU)
      }
      
      measureCPU()

      // Network status
      if ('connection' in navigator) {
        const connection = (navigator as any).connection
        const networkSpeed = connection.effectiveType === '4g' ? 90 : 
                           connection.effectiveType === '3g' ? 70 : 
                           connection.effectiveType === '2g' ? 40 : 20
        setMetrics(prev => ({ ...prev, network: networkSpeed }))
      }

      // Render performance
      const renderStart = performance.now()
      requestAnimationFrame(() => {
        const renderTime = performance.now() - renderStart
        const renderScore = Math.max(0, 100 - (renderTime / 16.67) * 100)
        setMetrics(prev => ({ ...prev, render: Math.round(renderScore) }))
      })
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 2000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (value: number) => {
    if (value >= 80) return "text-green-500"
    if (value >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getStatusText = (value: number) => {
    if (value >= 80) return "Excellent"
    if (value >= 60) return "Good"
    return "Needs Attention"
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          Performance Monitor
        </h3>
        <Button variant="outline" size="sm">
          <Monitor className="w-4 h-4 mr-2" />
          Optimize
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Memory</span>
            </div>
            <span className={`text-sm font-bold ${getStatusColor(100 - metrics.memory)}`}>
              {100 - metrics.memory}%
            </span>
          </div>
          <Progress value={100 - metrics.memory} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {getStatusText(100 - metrics.memory)}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">CPU</span>
            </div>
            <span className={`text-sm font-bold ${getStatusColor(100 - metrics.cpu)}`}>
              {100 - metrics.cpu}%
            </span>
          </div>
          <Progress value={100 - metrics.cpu} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {getStatusText(100 - metrics.cpu)}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Network</span>
            </div>
            <span className={`text-sm font-bold ${getStatusColor(metrics.network)}`}>
              {metrics.network}%
            </span>
          </div>
          <Progress value={metrics.network} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {getStatusText(metrics.network)}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">Render</span>
            </div>
            <span className={`text-sm font-bold ${getStatusColor(metrics.render)}`}>
              {metrics.render}%
            </span>
          </div>
          <Progress value={metrics.render} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {getStatusText(metrics.render)}
          </p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground">
          💡 <strong>Tip:</strong> Close unused tabs and refresh the page for better performance.
        </p>
      </div>
    </Card>
  )
}
