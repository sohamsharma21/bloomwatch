import Link from "next/link"
import { Flower2, ExternalLink, Award } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/30 border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Flower2 className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">BloomWatch</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Tracking global flowering phenology with NASA Earth observations.
            </p>
            <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-primary">NASA Space Apps Challenge 2025</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/dashboard"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/explorer"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Species Explorer
              </Link>
              <Link
                href="/timeline"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Timeline
              </Link>
              <Link
                href="/challenge"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Challenge Info
              </Link>
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <div className="space-y-2">
              <Link
                href="https://earthdata.nasa.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                NASA Earth Data
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
              <Link
                href="https://spaceappschallenge.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Space Apps Challenge
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
              <Link
                href="https://www.usanpn.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                USA Phenology Network
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
              <Link
                href="https://github.com/bloomwatch/app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Project Repository
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <div className="space-y-2">
              <Link href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Link href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Data Attribution
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} BloomWatch. Built for NASA Space Apps Challenge.
          </p>
          <div className="flex items-center space-x-4">
            <Link
              href="https://nasa.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              NASA
            </Link>
            <Link
              href="https://spaceappschallenge.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Space Apps
            </Link>
            <Link href="/challenge" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Team NovaMinds
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
