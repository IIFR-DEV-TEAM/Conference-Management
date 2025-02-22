"use client"

import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type React from "react"

export const VerificationForm = () => {
  const [code, setCode] = useState("")
  const [email, setEmail] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [resendDisabled, setResendDisabled] = useState(false)
  const [resendCountdown, setResendCountdown] = useState(0)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("verificationEmail")
    if (storedEmail) {
      setEmail(storedEmail)
    } else {
      // Fallback to getting email from session
      const getSession = async () => {
        const { data } = await supabase.auth.getSession()
        setEmail(data.session?.user.email ?? null)
      }
      getSession()
    }
  }, [supabase.auth])

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setResendDisabled(false)
    }
  }, [resendCountdown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (!email) {
      setError("No email found. Please try signing up again.")
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: "signup",
      })

      if (error) throw error

      // Clear the stored email from session storage
      sessionStorage.removeItem("verificationEmail")
      router.push("/dashboard")
    } catch (error) {
      setError(error instanceof Error ? error.message : "Verification failed")
    } finally {
      setLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (!email) {
      setError("No email found. Please try signing up again.")
      return
    }

    setError(null)
    setResendDisabled(true)
    setResendCountdown(120) // Set to 2 minutes (120 seconds)

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email,
      })

      if (error) throw error

      setError("A new verification code has been sent to your email.")
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to resend verification code")
      setResendDisabled(false)
      setResendCountdown(0)
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div
          className={`p-3 rounded-md ${error.startsWith("A new verification code") ? "bg-green-100 text-green-800" : "bg-destructive/10 text-destructive"} text-sm`}
        >
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="code" className="text-sm font-medium">
          Verification Code
        </label>
        <input
          id="code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          className="w-full p-2 rounded-md border bg-background"
          placeholder="Enter 6-digit code"
          maxLength={6}
          pattern="\d{6}"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Verify"}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={handleResendCode}
          disabled={resendDisabled}
          className="text-sm text-primary hover:underline disabled:opacity-50"
        >
          {resendCountdown > 0 ? `Resend code in ${formatTime(resendCountdown)}` : "Resend verification code"}
        </button>
      </div>
    </form>
  )
}

