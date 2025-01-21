// filepath: /app/dashboard/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { DarkModeToggle } from "@/components/DarkModeToggle"
import { getSession } from "@/lib/session"

interface Conference {
  id: string
  name: string
  role: "attendee" | "speaker"
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [conferences, setConferences] = useState<Conference[]>([])
  const router = useRouter()
  const supabase = createBrowserSupabaseClient()

  useEffect(() => {
    async function fetchUserData() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
      } else {
        setUser(user)
        // In a real app, you'd fetch the user's conferences from Supabase
        setConferences([
          { id: "1", name: "Tech Conference 2023", role: "attendee" },
          { id: "2", name: "Science Symposium", role: "speaker" },
        ])
      }
    }

    fetchUserData()
  }, [supabase, router])

  return (
    <div>
      <DarkModeToggle />
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user?.email}</CardTitle>
          <CardDescription>Your Conferences</CardDescription>
        </CardHeader>
        <CardContent>
          {conferences.map((conference) => (
            <div key={conference.id}>
              <h2>{conference.name}</h2>
              <p>Role: {conference.role}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}