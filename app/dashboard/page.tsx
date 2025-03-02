import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardTabs } from "./dashboard-tabs"
import { LogoutButton } from "@/components/logout-button"
import { ThemeSelector } from "@/components/theme-selector"
import { checkAndFixPermissions } from "@/lib/supabase/permissions"

export default async function DashboardPage() {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Check and fix permissions
  await checkAndFixPermissions()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <div className="flex items-center gap-4">
            <ThemeSelector />
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <DashboardTabs />
      </main>
    </div>
  )
}

