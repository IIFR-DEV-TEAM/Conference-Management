"use client"

import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { Calendar, MapPin, Users } from "lucide-react"
import Image from "next/image"

type Conference = {
  id: string
  title: string
  description: string
  date: string
  location: string
  attendees: number
  image_url: string
}

export function MyConferences() {
  const [conferences, setConferences] = useState<Conference[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchConferences() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session) {
          const { data, error } = await supabase
            .from("conferences")
            .select("*")
            .or(`organizer_id.eq.${session.user.id},attendees.cs.{${session.user.id}}`)

          if (error) throw error
          setConferences(data || [])
        }
      } catch (error) {
        console.error("Error fetching conferences:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchConferences()
  }, [supabase])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-lg border border-border p-4 space-y-4 animate-pulse">
            <div className="h-48 bg-muted rounded-md" />
            <div className="h-6 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (conferences.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-foreground">No conferences found</h3>
        <p className="text-muted-foreground mt-1">You haven't created or joined any conferences yet.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {conferences.map((conference) => (
        <div
          key={conference.id}
          className="group rounded-lg border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          <div className="aspect-video relative">
            <Image
              src={conference.image_url || "/placeholder.svg"}
              alt={conference.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4 space-y-4">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {conference.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2">{conference.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(conference.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{conference.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{conference.attendees} attendees</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

    