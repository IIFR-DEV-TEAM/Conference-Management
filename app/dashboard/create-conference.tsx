"use client"

import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import type React from "react" // Added import for React

export function CreateConference() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const date = formData.get("date") as string
    const location = formData.get("location") as string
    const image_url = formData.get("image_url") as string

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) throw new Error("Not authenticated")

      const { error } = await supabase.from("conferences").insert({
        title,
        description,
        date,
        location,
        image_url,
        organizer_id: session.user.id,
        attendees: [session.user.id],
      })

      if (error) throw error

      router.refresh()
      e.currentTarget.reset()
    } catch (error) {
      console.error("Error creating conference:", error)
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-foreground">
          Conference Title
        </label>
        <input
          id="title"
          name="title"
          required
          className="w-full p-2 rounded-md border border-input bg-background text-foreground"
          placeholder="Enter conference title"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-foreground">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          className="w-full p-2 rounded-md border border-input bg-background text-foreground"
          placeholder="Enter conference description"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="date" className="text-sm font-medium text-foreground">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            className="w-full p-2 rounded-md border border-input bg-background text-foreground"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-medium text-foreground">
            Location
          </label>
          <input
            id="location"
            name="location"
            required
            className="w-full p-2 rounded-md border border-input bg-background text-foreground"
            placeholder="Enter conference location"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="image_url" className="text-sm font-medium text-foreground">
          Cover Image URL
        </label>
        <input
          id="image_url"
          name="image_url"
          type="url"
          className="w-full p-2 rounded-md border border-input bg-background text-foreground"
          placeholder="Enter cover image URL (optional)"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Conference"}
      </button>
    </form>
  )
}

