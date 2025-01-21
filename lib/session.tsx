import { cookies, headers } from "next/headers"
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"

export async function getSession() {
  const supabase = createServerComponentSupabaseClient({
    headers: () => headers(),
    cookies: () => cookies()
  })
  
  const {
    data: { session },
    error
  } = await supabase.auth.getSession()

  if (error) {
    console.error("Error fetching session:", error)
    return null
  }

  return session
}

export async function getUserDetails() {
  const supabase = createServerComponentSupabaseClient({
    headers: () => headers(),
    cookies: () => cookies()
  })
  
  const {
    data: { user },
    error
  } = await supabase.auth.getUser()

  if (error) {
    console.error("Error fetching user details:", error)
    return null
  }

  return user
}

export async function clearSession() {
    const supabase = createServerComponentSupabaseClient({
      headers: () => headers(),
      cookies: () => cookies()
    })
  
    const { error } = await supabase.auth.signOut()
  
    if (error) {
      console.error("Error clearing session:", error)
      throw error
    }
  
    return true
  }
  