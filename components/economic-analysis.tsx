"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, DollarSign, BarChart3, PieChart, Globe, Calendar, AlertTriangle } from "lucide-react"

export function EconomicAnalysis() {
  const [selectedRegion, setSelectedRegion] = useState("global")
  const [selectedTimeframe, setSelectedTimeframe] = useState("annual")
  
  const regions = [
    { id: "global", name: "Global", flag: "🌍" },
    { id: "north-america", name: "North America", flag: "🇺🇸" },
    { id: "europe", name: "Europe", flag: "🇪🇺" },
    { id: "asia", name: "Asia", flag: "🇨🇳" },
  ]

  const timeframes = [
    { id: "monthly", name: "Monthly" },
    { id: "quarterly", name: "Quarterly" },
    { id: "annual", name: "Annual" },
    { id: "5year", name: "5-Year" },
  ]

  const economicData = [
    { 
      crop: "Wheat", 
      yield: "2.5M tons", 
      value: "$1.2B", 
      impact: "+15%",
      trend: "up",
      risk: "low"
    },
    { 
      crop: "Corn", 
      yield: "3.8M tons", 
      value: "$1.8B", 
      impact: "+12%",
      trend: "up",
      risk: "medium"
    },
    { 
      crop: "Rice", 
      yield: "1.9M tons", 
      value: "$950M", 
      impact: "+8%",
      trend: "stable",
      risk: "low"
    },
    { 
      crop: "Soybean", 
      yield: "2.1M tons", 
      value: "$1.1B", 
      impact: "+18%",
      trend: "up",
      risk: "high"
    },
  ]

  const marketTrends = [
    { sector: "Agriculture", change: "+12%", value: "$2.4T", trend: "up" },
    { sector: "Food Processing", change: "+8%", value: "$1.8T", trend: "up" },
    { sector: "Export Markets", change: "+15%", value: "$890B", trend: "up" },
    { sector: "Local Markets", change: "+5%", value: "$1.2T", trend: "stable" },
  ]

  const riskFactors = [
    { factor: "Climate Change", impact: "High", probability: "85%", mitigation: "Adaptive farming" },
    { factor: "Pest Outbreaks", impact: "Medium", probability: "60%", mitigation: "Early detection" },
    { factor: "Market Volatility", impact: "Medium", probability: "70%", mitigation: "Diversification" },
    { factor: "Supply Chain", impact: "Low", probability: "40%", mitigation: "Local sourcing" },
  ]

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Economic Impact Analysis</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            View Trends
          </Button>
          <Button variant="outline" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>
      
      {/* Region and Timeframe Selection */}
      <div className="flex gap-4 mb-6">
        <div className="flex gap-2">
          <Globe className="w-4 h-4 text-muted-foreground mt-2" />
          <div className="flex gap-1">
            {regions.map((region) => (
              <Button
                key={region.id}
                variant={selectedRegion === region.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRegion(region.id)}
              >
                <span className="mr-1">{region.flag}</span>
                {region.name}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground mt-2" />
          <div className="flex gap-1">
            {timeframes.map((timeframe) => (
              <Button
                key={timeframe.id}
                variant={selectedTimeframe === timeframe.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeframe(timeframe.id)}
              >
                {timeframe.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-600" />
          <h4 className="font-medium">Total Market Value</h4>
          <p className="text-2xl font-bold text-green-600">$5.05B</p>
          <p className="text-sm text-green-600">+13% vs last year</p>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <BarChart3 className="w-8 h-8 mx-auto mb-2 text-blue-600" />
          <h4 className="font-medium">Yield Increase</h4>
          <p className="text-2xl font-bold text-blue-600">+13%</p>
          <p className="text-sm text-blue-600">Average across crops</p>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <PieChart className="w-8 h-8 mx-auto mb-2 text-purple-600" />
          <h4 className="font-medium">Market Impact</h4>
          <p className="text-2xl font-bold text-purple-600">+18%</p>
          <p className="text-sm text-purple-600">Economic growth</p>
        </div>
      </div>
      
      {/* Crop Analysis */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Crop Yield Predictions</h4>
        <div className="space-y-3">
          {economicData.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  item.trend === 'up' ? 'bg-green-500' : 
                  item.trend === 'down' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
                <div>
                  <h5 className="font-medium">{item.crop}</h5>
                  <p className="text-sm text-muted-foreground">Yield: {item.yield}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{item.value}</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-green-600">{item.impact}</p>
                  {item.risk === 'high' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Market Trends */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Market Sector Analysis</h4>
        <div className="grid grid-cols-2 gap-4">
          {marketTrends.map((trend, index) => (
            <div key={index} className="p-3 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h5 className="font-medium">{trend.sector}</h5>
                <div className={`w-2 h-2 rounded-full ${
                  trend.trend === 'up' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
              </div>
              <p className="text-2xl font-bold">{trend.value}</p>
              <p className="text-sm text-green-600">{trend.change}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Risk Assessment */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Risk Assessment</h4>
        <div className="space-y-3">
          {riskFactors.map((risk, index) => (
            <div key={index} className="p-3 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h5 className="font-medium">{risk.factor}</h5>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    risk.impact === 'High' ? 'bg-red-100 text-red-700' :
                    risk.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {risk.impact} Impact
                  </span>
                  <span className="text-sm text-muted-foreground">{risk.probability} probability</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>Mitigation:</strong> {risk.mitigation}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Economic Forecast */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
        <h4 className="font-medium mb-2">Economic Forecast</h4>
        <p className="text-sm text-muted-foreground mb-3">
          Based on current bloom patterns and climate data, we predict continued growth in agricultural sectors.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Next Quarter</p>
            <p className="font-medium text-green-600">+8% Growth Expected</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Next Year</p>
            <p className="font-medium text-green-600">+15% Growth Expected</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
