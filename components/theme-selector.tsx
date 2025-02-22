"use client"

import { useTheme } from "@/lib/theme-provider"
import { Moon, Sun, Palette } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export function ThemeSelector() {
  const { theme, themeStyle, toggleTheme, setThemeStyle } = useTheme()
  const [showThemes, setShowThemes] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const themes = [
    { id: "default", name: "Default", class: "bg-[#4f46e5] dark:bg-[#6366f1]" },
    { id: "forest", name: "Forest", class: "bg-[#22c55e] dark:bg-[#16a34a]" },
    { id: "ocean", name: "Ocean", class: "bg-[#0ea5e9] dark:bg-[#0284c7]" },
    { id: "sunset", name: "Sunset", class: "bg-[#f97316] dark:bg-[#ea580c]" },
    { id: "monochrome", name: "Monochrome", class: "bg-[#333333] dark:bg-[#cccccc]" },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowThemes(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative flex items-center gap-2">
      <button
        onClick={toggleTheme}
        className="p-2 text-foreground hover:text-primary transition-colors relative"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowThemes(!showThemes)}
          className="p-2 text-foreground hover:text-primary transition-colors flex items-center gap-2"
          aria-label="Select theme style"
        >
          <Palette className="h-5 w-5" />
          <span className="text-sm hidden sm:inline-block capitalize">{themeStyle}</span>
        </button>

        {showThemes && (
          <div className="absolute right-0 mt-2 p-3 bg-card border border-border rounded-lg shadow-lg z-50 min-w-[160px] max-h-[60vh] overflow-y-auto">
            <div className="space-y-2">
              {themes.map((style) => (
                <button
                  key={style.id}
                  onClick={() => {
                    setThemeStyle(style.id as any)
                    setShowThemes(false)
                  }}
                  className={`w-full px-3 py-2 rounded-md text-left text-sm flex items-center gap-2 hover:bg-accent transition-colors ${
                    themeStyle === style.id ? "bg-accent" : ""
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full ${style.class}`} />
                  {style.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

