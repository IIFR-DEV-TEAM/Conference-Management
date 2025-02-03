"use client"

import { useTheme } from "@/lib/theme-provider"
import { Moon, Sun } from 'lucide-react'
import { useState } from "react"

export function ThemeSwitcher() {
  const { theme, themeColor, toggleTheme, setThemeColor } = useTheme()
  const [showPalette, setShowPalette] = useState(false)

  const colors = [
    { name: "blue", class: "bg-[hsl(221.2,83.2%,53.3%)]" },
    { name: "green", class: "bg-[hsl(142.1,70.6%,45.3%)]" },
    { name: "purple", class: "bg-[hsl(262.1,83.3%,57.8%)]" },
    { name: "rose", class: "bg-[hsl(346.8,77.2%,49.8%)]" },
  ]

  const themeColors = {
    blue: { primary: '221.2,83.2%,53.3%' },
    green: { primary: '142.1,70.6%,45.3%' },
    purple: { primary: '262.1,83.3%,57.8%' },
    rose: { primary: '346.8,77.2%,49.8%' },
  };


  return (
    <div className="relative">
      <button
        onClick={toggleTheme}
        className="p-2 text-foreground hover:text-primary transition-colors relative"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </button>
      
      <button
        onClick={() => setShowPalette(!showPalette)}
        className="ml-2 w-5 h-5 rounded-full border-2 border-foreground/20"
        style={{
          backgroundColor: `hsl(${themeColors[themeColor].primary})`,
        }}
      />

      {showPalette && (
        <div className="absolute right-0 mt-2 p-2 bg-card border border-border rounded-lg shadow-lg grid grid-cols-2 gap-2 z-50">
          {colors.map((color) => (
            <button
              key={color.name}
              className={`w-6 h-6 rounded-full ${color.class} hover:scale-110 transition-transform`}
              onClick={() => {
                setThemeColor(color.name as any)
                setShowPalette(false)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
