"use client"

import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import Link from "next/link"
import  { FaCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt } from "react-icons/fa"
import type { Conference } from "@/lib/supabase/schema"


export function ConferenceTable() {
  const [conferences, setConferences] = useState<Conference[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
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
            .order("created_at", { ascending: false })

          if (error) throw error

          if (data) {
            setConferences(data)
            console.log("Fetched conferences:", data)
          } else {
            console.log("No conferences found")
          }
        }
      } catch (error) {
        console.error("Error fetching conferences:", error)
        setError(error instanceof Error ? error.message : "An error occurred while fetching conferences")
      } finally {
        setLoading(false)
      }
    }

    fetchConferences()
  }, [supabase])

  if (loading) {
    return <div>Loading conferences...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
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
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-foreground">
        <thead className="text-xs uppercase bg-muted">
          <tr>
            <th scope="col" className="px-6 py-3">
              Conference Name
            </th>
            <th scope="col" className="px-6 py-3">
              Start Date
            </th>
            <th scope="col" className="px-6 py-3">
              Location
            </th>
            <th scope="col" className="px-6 py-3">
              Link
            </th>
            <th scope="col" className="px-6 py-3">
              User Status
            </th>
          </tr>
        </thead>
        <tbody>
          {conferences.map((conference) => (
            <tr key={conference.id} className="bg-card border-b border-border hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4 font-medium">{conference.title}</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <FaCalendarAlt className="w-4 h-4 mr-2 text-muted-foreground" />
                  {new Date(conference.start_date).toLocaleDateString()}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="w-4 h-4 mr-2 text-muted-foreground" />
                  {conference.location}
                </div>
              </td>
              <td className="px-6 py-4">
                <Link
                  href={conference.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-primary hover:underline"
                >
                  <FaExternalLinkAlt className="w-4 h-4 mr-2" />
                  Visit
                </Link>
              </td>

              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium
                  ${
                    conference.user_status === "admin"
                      ? "bg-blue-100 text-blue-800"
                      : conference.user_status === "superadmin"
                        ? "bg-purple-100 text-purple-800"
                        : conference.user_status === "author"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {conference.user_status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

