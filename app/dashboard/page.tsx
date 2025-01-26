import type { Metadata } from "next"
import DashboardContent from "@/components/dashboard-content"
import { DashboardHeader } from "@/components/dashboard-header"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Conference Management Dashboard",
}

export default function DashboardPage() {
  return (
    <>
      <div className="hidden flex-col md:flex">
        <DashboardHeader />
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <DashboardContent />
        </div>
      </div>
    </>
  )
}

