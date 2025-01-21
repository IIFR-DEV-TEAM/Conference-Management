"use-client"

import { ThemeProvider } from "@/components/ThemeProvider"
import Header from "../components/Header"
import Hero from "../components/Hero"
import Features from "../components/Features"
import Testimonials from "../components/Testimonials"
import Footer from "../components/Footer"

import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './admin-dash/Layout'
import Dashboard from './admin-dash/Dashboard'
import UserManagement from './admin-dash/UserManagement'
import TrackManagement from './admin-dash/TrackManagement'
import EmailInvitation from './admin-dash/EmailInvitation'

export default function Home() {
  const [user, setUser] = useState({ name: 'Admin User', role: 'Super Admin' })
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


  const [user, setUser] = useState({ name: 'Admin User', role: 'Super Admin' })

  return (
    <Router>
      <Layout user={user}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/tracks" element={<TrackManagement />} />
          <Route path="/invite" element={<EmailInvitation />} />
        </Routes>
      </Layout>
    </Router>
  )
}
