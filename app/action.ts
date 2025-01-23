"use server"

import { supabase } from "@/lib/supabase"

export async function registerUser(prevState: any, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const recaptchaToken = formData.get("recaptchaToken") as string

  // TODO: Verify reCAPTCHA token

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })

    if (error) throw error

    return { success: true }
  } catch (error) {
    return { error: "Failed to create user. Please try again." }
  }
}

export async function loginUser(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const recaptchaToken = formData.get("recaptchaToken") as string

  // TODO: Verify reCAPTCHA token

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return { success: true }
  } catch (error) {
    return { error: "Failed to log in. Please try again." }
  }
}

