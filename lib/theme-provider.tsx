"use client"

import { createContext, useContext, useEffect, useState } from "react"
import type { ReactNode } from "react"

type Theme = "light" | "dark"
type ThemeStyle = "default" | "forest" | "ocean" | "sunset" | "monochrome"

interface ThemeColors {
  background: string
  foreground: string
  card: string
  "card-foreground": string
  popover: string
  "popover-foreground": string
  primary: string
  "primary-foreground": string
  secondary: string
  "secondary-foreground": string
  muted: string
  "muted-foreground": string
  accent: string
  "accent-foreground": string
  destructive: string
  "destructive-foreground": string
  border: string
  input: string
  ring: string
}

type ThemeContextType = {
  theme: Theme
  themeStyle: ThemeStyle
  toggleTheme: () => void
  setThemeStyle: (style: ThemeStyle) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const themes: Record<ThemeStyle, { light: ThemeColors; dark: ThemeColors }> = {
  default: {
    light: {
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      card: "0 0% 100%",
      "card-foreground": "240 10% 3.9%",
      popover: "0 0% 100%",
      "popover-foreground": "240 10% 3.9%",
      primary: "221.2 83.2% 53.3%",
      "primary-foreground": "210 40% 98%",
      secondary: "210 40% 96.1%",
      "secondary-foreground": "222.2 47.4% 11.2%",
      muted: "210 40% 96.1%",
      "muted-foreground": "215.4 16.3% 46.9%",
      accent: "210 40% 96.1%",
      "accent-foreground": "222.2 47.4% 11.2%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "210 40% 98%",
      border: "214.3 31.8% 91.4%",
      input: "214.3 31.8% 91.4%",
      ring: "221.2 83.2% 53.3%",
    },
    dark: {
      background: "240 10% 3.9%",
      foreground: "0 0% 98%",
      card: "240 10% 3.9%",
      "card-foreground": "0 0% 98%",
      popover: "240 10% 3.9%",
      "popover-foreground": "0 0% 98%",
      primary: "217.2 91.2% 59.8%",
      "primary-foreground": "222.2 47.4% 11.2%",
      secondary: "217.2 32.6% 17.5%",
      "secondary-foreground": "210 40% 98%",
      muted: "217.2 32.6% 17.5%",
      "muted-foreground": "215 20.2% 65.1%",
      accent: "217.2 32.6% 17.5%",
      "accent-foreground": "210 40% 98%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "210 40% 98%",
      border: "217.2 32.6% 17.5%",
      input: "217.2 32.6% 17.5%",
      ring: "224.3 76.3% 48%",
    },
  },
  forest: {
    light: {
      background: "120 25% 95%",
      foreground: "120 40% 10%",
      card: "120 25% 98%",
      "card-foreground": "120 40% 10%",
      popover: "120 25% 98%",
      "popover-foreground": "120 40% 10%",
      primary: "142.1 76.2% 36.3%",
      "primary-foreground": "355.7 100% 97.3%",
      secondary: "120 25% 92%",
      "secondary-foreground": "120 40% 10%",
      muted: "120 25% 92%",
      "muted-foreground": "120 20% 40%",
      accent: "120 25% 92%",
      "accent-foreground": "120 40% 10%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "0 0% 98%",
      border: "120 25% 90%",
      input: "120 25% 90%",
      ring: "142.1 76.2% 36.3%",
    },
    dark: {
      background: "120 40% 5%",
      foreground: "120 25% 95%",
      card: "120 40% 8%",
      "card-foreground": "120 25% 95%",
      popover: "120 40% 8%",
      "popover-foreground": "120 25% 95%",
      primary: "142.1 70.6% 45.3%",
      "primary-foreground": "144.9 80.4% 10%",
      secondary: "120 40% 12%",
      "secondary-foreground": "120 25% 95%",
      muted: "120 40% 12%",
      "muted-foreground": "120 25% 80%",
      accent: "120 40% 12%",
      "accent-foreground": "120 25% 95%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "0 0% 98%",
      border: "120 40% 12%",
      input: "120 40% 12%",
      ring: "142.4 71.8% 29.2%",
    },
  },
  ocean: {
    light: {
      background: "200 50% 97%",
      foreground: "200 50% 10%",
      card: "200 50% 98%",
      "card-foreground": "200 50% 10%",
      popover: "200 50% 98%",
      "popover-foreground": "200 50% 10%",
      primary: "199 89% 48%",
      "primary-foreground": "0 0% 100%",
      secondary: "200 50% 92%",
      "secondary-foreground": "200 50% 10%",
      muted: "200 50% 92%",
      "muted-foreground": "200 40% 40%",
      accent: "200 50% 92%",
      "accent-foreground": "200 50% 10%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "0 0% 98%",
      border: "200 50% 90%",
      input: "200 50% 90%",
      ring: "199 89% 48%",
    },
    dark: {
      background: "200 50% 5%",
      foreground: "200 50% 95%",
      card: "200 50% 8%",
      "card-foreground": "200 50% 95%",
      popover: "200 50% 8%",
      "popover-foreground": "200 50% 95%",
      primary: "199 89% 48%",
      "primary-foreground": "0 0% 100%",
      secondary: "200 50% 12%",
      "secondary-foreground": "200 50% 95%",
      muted: "200 50% 12%",
      "muted-foreground": "200 50% 80%",
      accent: "200 50% 12%",
      "accent-foreground": "200 50% 95%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "0 0% 98%",
      border: "200 50% 12%",
      input: "200 50% 12%",
      ring: "199 89% 48%",
    },
  },
  sunset: {
    light: {
      background: "20 50% 97%",
      foreground: "20 50% 10%",
      card: "20 50% 98%",
      "card-foreground": "20 50% 10%",
      popover: "20 50% 98%",
      "popover-foreground": "20 50% 10%",
      primary: "20.5 90.2% 48.2%",
      "primary-foreground": "0 0% 100%",
      secondary: "20 50% 92%",
      "secondary-foreground": "20 50% 10%",
      muted: "20 50% 92%",
      "muted-foreground": "20 40% 40%",
      accent: "20 50% 92%",
      "accent-foreground": "20 50% 10%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "0 0% 98%",
      border: "20 50% 90%",
      input: "20 50% 90%",
      ring: "20.5 90.2% 48.2%",
    },
    dark: {
      background: "20 50% 5%",
      foreground: "20 50% 95%",
      card: "20 50% 8%",
      "card-foreground": "20 50% 95%",
      popover: "20 50% 8%",
      "popover-foreground": "20 50% 95%",
      primary: "20.5 90.2% 48.2%",
      "primary-foreground": "0 0% 100%",
      secondary: "20 50% 12%",
      "secondary-foreground": "20 50% 95%",
      muted: "20 50% 12%",
      "muted-foreground": "20 50% 80%",
      accent: "20 50% 12%",
      "accent-foreground": "20 50% 95%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "0 0% 98%",
      border: "20 50% 12%",
      input: "20 50% 12%",
      ring: "20.5 90.2% 48.2%",
    },
  },
  monochrome: {
    light: {
      background: "0 0% 100%",
      foreground: "0 0% 10%",
      card: "0 0% 98%",
      "card-foreground": "0 0% 10%",
      popover: "0 0% 98%",
      "popover-foreground": "0 0% 10%",
      primary: "0 0% 20%",
      "primary-foreground": "0 0% 100%",
      secondary: "0 0% 92%",
      "secondary-foreground": "0 0% 10%",
      muted: "0 0% 92%",
      "muted-foreground": "0 0% 40%",
      accent: "0 0% 92%",
      "accent-foreground": "0 0% 10%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "0 0% 98%",
      border: "0 0% 90%",
      input: "0 0% 90%",
      ring: "0 0% 20%",
    },
    dark: {
      background: "0 0% 5%",
      foreground: "0 0% 95%",
      card: "0 0% 8%",
      "card-foreground": "0 0% 95%",
      popover: "0 0% 8%",
      "popover-foreground": "0 0% 95%",
      primary: "0 0% 80%",
      "primary-foreground": "0 0% 5%",
      secondary: "0 0% 12%",
      "secondary-foreground": "0 0% 95%",
      muted: "0 0% 12%",
      "muted-foreground": "0 0% 80%",
      accent: "0 0% 12%",
      "accent-foreground": "0 0% 95%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "0 0% 98%",
      border: "0 0% 12%",
      input: "0 0% 12%",
      ring: "0 0% 80%",
    },
  },
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<Theme>("light")
  const [themeStyle, setThemeStyle] = useState<ThemeStyle>("default")

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") as Theme
    const savedStyle = localStorage.getItem("themeStyle") as ThemeStyle

    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    } else {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      setTheme(systemTheme)
      document.documentElement.classList.toggle("dark", systemTheme === "dark")
    }

    if (savedStyle) {
      setThemeStyle(savedStyle)
      applyTheme(savedStyle, savedTheme || theme)
    }
  }, [theme]) // Added theme to dependencies

  const applyTheme = (style: ThemeStyle, mode: Theme) => {
    const root = document.documentElement
    const colors = themes[style][mode]

    Object.entries(colors).forEach(([property, value]) => {
      root.style.setProperty(`--${property}`, value)
    })
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark")
    applyTheme(themeStyle, newTheme)
  }

  const handleSetThemeStyle = (style: ThemeStyle) => {
    setThemeStyle(style)
    localStorage.setItem("themeStyle", style)
    applyTheme(style, theme)
  }

  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeStyle,
        toggleTheme,
        setThemeStyle: handleSetThemeStyle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used within ThemeProvider")
  return context
}

