import { createClient } from "@/lib/supabase/server"

export async function checkAndFixPermissions() {
  const supabase = createClient()

  try {
    // Check if the authenticated user has the necessary permissions
    const { data: permissions, error: permissionsError } = await supabase.rpc("check_table_permissions", {
      table_name: "conferences",
    })

    if (permissionsError) throw permissionsError

    if (!permissions.select || !permissions.insert) {
      // If permissions are missing, try to grant them
      const { error: grantError } = await supabase.rpc("grant_table_permissions", { table_name: "conferences" })

      if (grantError) throw grantError

      console.log("Permissions fixed for conferences table")
    } else {
      console.log("Permissions are correctly set for conferences table")
    }
  } catch (error) {
    console.error("Error checking or fixing permissions:", error)
  }
}

