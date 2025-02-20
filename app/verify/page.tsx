import { Navbar } from "@/components/navbar"
import { VerificationForm } from "./verification-form"

export default function VerifyPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Verify Your Account</h1>
            <p className="text-muted-foreground">Enter the 6-digit code sent to your email</p>
          </div>
          <VerificationForm />
        </div>
      </main>
    </>
  )
}

