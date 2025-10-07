// app/page.js
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Lynxa Pro
          </Link>
          <nav className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/sign-in">
                Sign In
              </Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">
                Sign Up
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
                The Power of AI,
                <span className="block text-primary mt-2">Simplified.</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Lynxa Pro, developed by Nexariq, provides intelligent, professional AI assistance. 
                Generate API keys, integrate our powerful models, and build the future.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="w-full sm:w-auto min-w-[160px]" asChild>
                <Link href="/sign-up">
                  Get Started
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[160px]" asChild>
                <Link href="/dashboard">
                  Go to Dashboard →
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Nexariq, a sub-brand of AJ STUDIOZ. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
