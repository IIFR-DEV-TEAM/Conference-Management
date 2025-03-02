"use client"

import { useState } from "react"
import { CreateConference } from "./create-conference"
import { ConferenceTable } from "./conference-table"

type Tab = "create" | "table"

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("table")

  const tabs = [
    { id: "table", label: "Conference Table" },
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

      <div className="mt-6">
        {activeTab === "table" && <ConferenceTable />}
        {activeTab === "create" && <CreateConference />}
      </div>
    </div>
  )
}

