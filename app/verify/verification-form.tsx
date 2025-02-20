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
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setEmail(data.session?.user.email ?? null)
    }
    getSession()
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
    setResendCountdown(60)

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email,
      })

      if (error) throw error

      setError("A new verification code has been sent to your email.")
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to resend verification code")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">{error}</div>}

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
          {resendCountdown > 0 ? `Resend code in ${resendCountdown}s` : "Resend verification code"}
        </button>
      </div>
    </form>
  )
}

