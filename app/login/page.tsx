"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, ArrowRight, Chrome } from "lucide-react"; 
import { ReCaptcha } from "@/components/ReCaptcha";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push("/dashboard");
    } catch (error) {
      setError("Failed to log in. Please check your credentials and try again.");
    }
  };

  const handleRecaptchaVerify = (token: string | null) => {
    setRecaptchaToken(token || '');
    setError(null);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <div className="hidden lg:flex flex-1 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }} />
      <div className="flex flex-col items-center justify-center flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-lg rounded-lg bg-white dark:bg-gray-800 transition-transform transform hover:scale-105">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">Welcome Back</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="block text-gray-700 dark:text-gray-300">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input id="email" type="email" placeholder="m@example.com" className="w-full pl-10 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="password" className="block text-gray-700 dark:text-gray-300">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input id="password" type="password" placeholder="••••••••" className="w-full pl-10 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                </div>
                <ReCaptcha onVerify={handleRecaptchaVerify} />
                {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center transition duration-200 ease-in-out">
                  Sign in
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-4">
              <div className="flex items-center">
                <div className="bg-gray-300 dark:bg-gray-600 h-px flex-grow" />
                <span className="mx-2 text-sm text-gray-500 dark:text-gray-400">OR</span>
                <div className="bg-gray-300 dark:bg-gray-600 h-px flex-grow" />
              </div>
              <Button variant="outline" className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md flex items-center justify-center transition duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700">
                <Chrome className="mr-2" size={16} />
                Sign in with Google
              </Button>
              <div className="text-center text-sm">
                <Link href="/register" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Don't have an account? Sign up</Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
