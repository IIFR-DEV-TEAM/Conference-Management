import type { Metadata } from "next"
import DashboardContent from "@/components/dashboard-content"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Conference Management Dashboard",
}

export default function DashboardPage() {
  return (
    <>
      <div className="md:hidden">
        <img
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <img
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
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

