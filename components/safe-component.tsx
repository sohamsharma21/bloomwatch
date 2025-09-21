"use client"

import type React from "react"

import { Suspense } from "react"
import { ErrorBoundary } from "./error-boundary"
import { LoadingSpinner } from "./loading-spinner"

interface SafeComponentProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  loadingText?: string
  errorFallback?: React.ReactNode
}

export function SafeComponent({ children, fallback, loadingText = "Loading...", errorFallback }: SafeComponentProps) {
  const defaultFallback = fallback || <LoadingSpinner text={loadingText} className="py-8" />

  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={defaultFallback}>{children}</Suspense>
    </ErrorBoundary>
  )
}
