"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(600) // 10 minutes in seconds
  const [canResend, setCanResend] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  useEffect(() => {
    if (!email) {
      router.push("/register")
    }
  }, [email, router])

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer)
          setCanResend(true)
          return 0
        }
        return prevCountdown - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setIsLoading(true)
      setError(null)

      try {
        if (!email) {
          throw new Error("Email not found. Please try signing up again.")
        }

        const { data, error } = await supabase.auth.verifyOtp({
          email,
          token: otp.join(""),
          type: "signup",
        })

        if (error) throw error

        router.push("/dashboard")
      } catch (error: any) {
        if (error.message.includes("Invalid otp")) {
          setError("Invalid verification code. Please check and try again.")
        } else if (error.message.includes("Token has expired")) {
          setError("Verification code has expired. Please request a new one.")
        } else {
          setError("Failed to verify code. Please try again.")
        }
      } finally {
        setIsLoading(false)
      }
    },
    [otp, email, router],
  )

  const handleOtpChange = useCallback(
    (index: number, value: string) => {
      if (value.length > 1) {
        value = value.slice(0, 1)
      }
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Move to next input if current one is filled
      if (value !== "" && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement
        if (nextInput) {
          nextInput.focus()
        }
      }
    },
    [otp],
  )

  const handleResendOTP = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      if (!email) {
        throw new Error("Email not found. Please try signing up again.")
      }

      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email,
      })

      if (error) throw error

      setCountdown(600)
      setCanResend(false)
      alert("A new verification code has been sent to your email.")
    } catch (error: any) {
      setError(error.message || "Failed to resend verification code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }, [email])

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }, [])

  if (!email) {
    return null
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
              Verify Your Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp-0" className="text-gray-700 dark:text-gray-300">
                  Enter 6-digit Verification Code
                </Label>
                <div className="flex justify-between">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="\d{1}"
                      maxLength={1}
                      className="w-12 h-12 text-center text-2xl bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      required
                      aria-label={`Digit ${index + 1} of verification code`}
                    />
                  ))}
                </div>
              </div>
              {error && (
                <p className="text-sm text-red-500" role="alert">
                  {error}
                </p>
              )}
              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                Verification code expires in: <span className="font-bold">{formatTime(countdown)}</span>
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify Code"}
                <ArrowRight className="ml-2" size={16} />
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleResendOTP}
                disabled={isLoading || !canResend}
                className="w-full mt-2"
              >
                <RefreshCw className="mr-2" size={16} />
                Resend Verification Code
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              Didn't receive the code? Check your spam folder or{" "}
              <Button variant="link" className="p-0" onClick={() => router.push("/register")}>
                try signing up again
              </Button>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

export default React.memo(VerifyOTP)

