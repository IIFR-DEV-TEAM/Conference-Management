import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { RegisterForm } from "./register-form"

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-muted-foreground">Get started with your conference management journey</p>
          </div>
          <RegisterForm />
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}

