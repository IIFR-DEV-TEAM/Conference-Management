"use client"

import { useState } from "react"
import { MyConferences } from "./my-conference"
import { CreateConference } from "./create-conference"

type Tab = "my-conferences" | "create"

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("my-conferences")

  const tabs = [
    { id: "my-conferences", label: "My Conferences" },
    { id: "create", label: "Create Conference" },
  ]

  return (
    <div className="space-y-6">
      <div className="border-b border-border">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`pb-4 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">{activeTab === "my-conferences" ? <MyConferences /> : <CreateConference />}</div>
    </div>
  )
}

