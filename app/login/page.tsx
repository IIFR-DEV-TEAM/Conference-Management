import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { LoginForm } from "./login-form"

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>
          <LoginForm />
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}

