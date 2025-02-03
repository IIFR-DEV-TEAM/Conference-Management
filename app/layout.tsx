import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/lib/theme-provider"
import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Conference Management",
  description: "Professional conference management platform",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen bg-background text-foreground`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

