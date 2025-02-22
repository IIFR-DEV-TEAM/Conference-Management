"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { ThemeSelector } from "./theme-selector"

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
  ]

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-lg shadow-lg" : "bg-background/50 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            ConferenceHub
          </Link>

          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group"
              >
                {item.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <ThemeSelector />
            <Link
              href="/login"
              className="px-3 py-2 text-sm bg-background text-foreground border border-input hover:bg-accent transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-3 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Register
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <ThemeSelector />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground hover:text-primary transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`
            md:hidden absolute inset-x-0 top-full bg-background/80 backdrop-blur-lg border-b
            transition-all duration-300 ease-in-out
            ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
          `}
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Link
                href="/login"
                className="w-full py-2 text-center bg-background text-foreground border border-input hover:bg-accent transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="w-full py-2 text-center bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

