import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
// import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Preloader } from "@/components/preloader"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "BloomWatch - Global Flowering Phenology",
  description: "Tracking global flowering phenology with NASA Earth observations",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <Preloader />
            {children}
          </ThemeProvider>
          {/* <Analytics /> */}
        </Suspense>
      </body>
    </html>
  )
}
