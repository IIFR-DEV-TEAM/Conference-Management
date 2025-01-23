import { ThemeProvider } from "@/components/ThemeProvider"
import Header from "../components/Header"
import Hero from "../components/Hero"
import Features from "../components/Features"
import Testimonials from "../components/Testimonials"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <Hero />
        <Features />
        <Testimonials />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

