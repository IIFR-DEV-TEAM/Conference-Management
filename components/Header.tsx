import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <Link href="/">
              <span className="sr-only">ConferenceHub</span>
              <svg className="h-10 w-auto text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              <Link href="#features" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Features
              </Link>
              <Link href="#testimonials" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Testimonials
              </Link>
              <Link href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Pricing
              </Link>
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <Link href="/login">
              <Button variant="outline" className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50">
                Sign in
              </Button>
            </Link>
            <Link href="/register">
              <Button className="inline-block bg-indigo-600 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-indigo-700">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          <Link href="#features" className="text-base font-medium text-gray-500 hover:text-gray-900">
            Features
          </Link>
          <Link href="#testimonials" className="text-base font-medium text-gray-500 hover:text-gray-900">
            Testimonials
          </Link>
          <Link href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
            Pricing
          </Link>
        </div>
      </nav>
    </header>
  )
}

