// app/page.js
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">Lynxa Pro</div>
        <nav>
          <Link href="/sign-in" className="text-gray-600 hover:text-gray-800 px-4">
            Sign In
          </Link>
          <Link href="/sign-up" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ml-2">
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center text-center px-6 py-12">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl">
            The Power of AI,
            <span className="block text-blue-600">Simplified.</span>
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            Lynxa Pro, developed by Nexariq, provides intelligent, professional AI assistance. 
            Generate API keys, integrate our powerful models, and build the future.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/sign-up"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Get Started
            </Link>
            <Link href="/dashboard" className="text-sm font-semibold leading-6 text-gray-900">
              Go to Dashboard <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-gray-500 border-t">
        <p>&copy; {new Date().getFullYear()} Nexariq, a sub-brand of AJ STUDIOZ. All rights reserved.</p>
      </footer>
    </div>
  )
}
