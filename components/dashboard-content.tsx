"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import ConferenceList from "@/components/conference-list"
import PaperList from "@/components/paper-list"
import CreateConferenceForm from "@/components/create-conference-form"
import JoinConferenceForm from "@/components/join-conference-form"

export default function DashboardContent() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showJoinForm, setShowJoinForm] = useState(false)

  return (
    <Tabs defaultValue="my-conferences" className="space-y-4">
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="my-conferences">My Conferences</TabsTrigger>
          <TabsTrigger value="papers">Papers</TabsTrigger>
        </TabsList>
        <div className="space-x-2">
          <Button onClick={() => setShowCreateForm(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Conference
          </Button>
          <Button variant="outline" onClick={() => setShowJoinForm(true)}>
            Join Conference
          </Button>
        </div>
      </div>
      <TabsContent value="my-conferences" className="space-y-4">
        <ConferenceList />
      </TabsContent>
      <TabsContent value="papers" className="space-y-4">
        <PaperList />
      </TabsContent>
      {showCreateForm && <CreateConferenceForm onClose={() => setShowCreateForm(false)} />}
      {showJoinForm && <JoinConferenceForm onClose={() => setShowJoinForm(false)} />}
    </Tabs>
  )
}

