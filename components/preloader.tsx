"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Flower } from "lucide-react"

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev: number) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-8">
        {/* Animated Logo Container */}
        <div className="relative">
          {/* Main Logo with Float Animation */}
          <div className="float-animation glow-animation rounded-full p-2 border-4 border-primary/30 bg-background/50 backdrop-blur-sm">
            <div className="relative w-32 h-32 rounded-full overflow-hidden flex items-center justify-center">
              <Image
                src="/bloomwatch-logo.png"
                alt="BloomWatch Logo"
                fill
                className="object-cover drop-shadow-2xl"
                sizes="128px"
                priority
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.style.display = 'none';
                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                  if (nextElement) {
                    nextElement.style.display = 'flex';
                  }
                }}
              />
              <Flower className="w-20 h-20 text-primary hidden" />
            </div>
          </div>

          {/* Orbital Ring Animation */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 orbit-animation">
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full shadow-lg"></div>
          </div>

          {/* Secondary Orbital Ring */}
          <div
            className="absolute inset-4 rounded-full border border-secondary/20 orbit-animation"
            style={{ animationDuration: "4s", animationDirection: "reverse" }}
          >
            <div className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-secondary rounded-full"></div>
          </div>
        </div>

        {/* Loading Text with Staggered Animation */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-foreground">
            <span className="inline-block animate-pulse" style={{ animationDelay: "0s" }}>
              B
            </span>
            <span className="inline-block animate-pulse" style={{ animationDelay: "0.1s" }}>
              l
            </span>
            <span className="inline-block animate-pulse" style={{ animationDelay: "0.2s" }}>
              o
            </span>
            <span className="inline-block animate-pulse" style={{ animationDelay: "0.3s" }}>
              o
            </span>
            <span className="inline-block animate-pulse" style={{ animationDelay: "0.4s" }}>
              m
            </span>
            <span className="inline-block animate-pulse" style={{ animationDelay: "0.5s" }}>
              W
            </span>
            <span className="inline-block animate-pulse" style={{ animationDelay: "0.6s" }}>
              a
            </span>
            <span className="inline-block animate-pulse" style={{ animationDelay: "0.7s" }}>
              t
            </span>
            <span className="inline-block animate-pulse" style={{ animationDelay: "0.8s" }}>
              c
            </span>
            <span className="inline-block animate-pulse" style={{ animationDelay: "0.9s" }}>
              h
            </span>
          </h2>
          <p className="text-sm text-muted-foreground animate-pulse">Loading Earth's flowering data...</p>
          <p className="text-xs text-muted-foreground/70">{Math.min(Math.round(progress), 100)}% Complete</p>
        </div>

        {/* Enhanced Loading Bar */}
        <div className="w-64 space-y-2">
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full transition-all duration-300 ease-out loading-animation"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground/60">
            <span>Initializing...</span>
            <span>NASA Earth Data</span>
          </div>
        </div>

        {/* Floating Particles Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full animate-pulse"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
