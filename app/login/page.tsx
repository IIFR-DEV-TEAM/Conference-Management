'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Mail, Lock, ArrowRight } from 'lucide-react'
import {ReCaptcha} from '@/components/ReCaptcha'
import { toast } from '@/components/ui/use-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!recaptchaToken) {
      toast({
        variant: "destructive",
        title: "Verification required",
        description: "Please complete the reCAPTCHA verification"
      })
      return
    }

    setIsLoading(true)
    
    try {
      // First verify the captcha
      const captchaResponse = await fetch('/api/captcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: recaptchaToken }),
      })

      const captchaData = await captchaResponse.json()

      if (!captchaData.success) {
        toast({
          variant: "destructive",
          title: "Verification failed",
          description: "ReCAPTCHA verification failed. Please try again."
        })
        return
      }

      // If captcha is verified, proceed with login
      const loginResponse = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const loginData = await loginResponse.json()

      if (loginResponse.ok) {
        toast({
          title: "Success",
          description: "Logged in successfully"
        })
        router.push('/')
      } else {
        throw new Error(loginData.message || 'Login failed')
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred during login"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRecaptchaVerify = (token: string | null) => {
    setRecaptchaToken(token)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"}}>
      <Card className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in to your account</CardTitle>
          <CardDescription className="text-center">Enter your email and password to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <ReCaptcha onVerify={handleRecaptchaVerify} />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                "Signing in..."
              ) : (
                <>
                  Sign in
                  <ArrowRight className="ml-2" size={16} />
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <div className="bg-gray-200 h-px flex-grow" />
            <span className="text-sm text-gray-400">OR</span>
            <div className="bg-gray-200 h-px flex-grow" />
          </div>
          <Button variant="outline" className="w-full" disabled={isLoading}>
            Sign in with Google
          </Button>
          <div className="text-center text-sm">
            <Link href="/register" className="text-indigo-600 hover:text-indigo-800 transition-colors">
              Don't have an account? Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}