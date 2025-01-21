"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function JoinConference() {
  const [conferenceCode, setConferenceCode] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send a request to join the conference
    console.log("Joining conference with code:", conferenceCode)
    // For now, we'll just redirect back to the dashboard
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Join a Conference</CardTitle>
          <CardDescription>Enter the conference code to join as an author</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="conferenceCode">Conference Code</Label>
                <Input
                  id="conferenceCode"
                  value={conferenceCode}
                  onChange={(e) => setConferenceCode(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Join Conference
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" onClick={() => router.push("/dashboard")} className="w-full">
            Back to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

