import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardTabs } from "./dashboard-tabs"

export default async function DashboardPage() {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Conference Dashboard</h1>
          <p className="text-muted-foreground">Manage your conferences and registrations</p>
        </div>
        <DashboardTabs />
      </main>
    </div>
  )
}

