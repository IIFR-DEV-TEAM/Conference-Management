import { Navbar } from "@/components/navbar"
import { VerificationForm } from "./verification-form"
import { Mail } from "lucide-react"

export default function VerifyPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Verify Your Account</h1>
            <p className="text-muted-foreground mt-2">
              We've sent a 6-digit verification code to your email. Please enter it below to verify your account.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <VerificationForm />
          </div>
          <div className="text-center text-sm text-muted-foreground">
            <p>Didn't receive the code?</p>
            <p>Check your spam folder or request a new code above.</p>
          </div>
        </div>
      </main>
    </>
  )
}

