import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as Separator from '@radix-ui/react-separator'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Users, ListTodo, Mail, Menu, X } from 'lucide-react'
import { isGeneratorFunction } from 'util/types'
//@ts-ignore
export default function Layout({ user, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-center h-20 shadow-md">
          <h1 className="text-3xl font-semibold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-10">
          <Link to="/" className="flex items-center py-2 px-8 text-gray-700 hover:bg-gray-200">
            <LayoutDashboard className="mr-2" />
            Dashboard
          </Link>
          <Link to="/users" className="flex items-center mt-5 py-2 px-8 text-gray-700 hover:bg-gray-200">
            <Users className="mr-2" />
            User Management
          </Link>
          <Link to="/tracks" className="flex items-center mt-5 py-2 px-8 text-gray-700 hover:bg-gray-200">
            <ListTodo className="mr-2" />
            Track Management
          </Link>
          <Link to="/invite" className="flex items-center mt-5 py-2 px-8 text-gray-700 hover:bg-gray-200">
            <Mail className="mr-2" />
            Email Invitation
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="text-gray-500 focus:outline-none lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
          <div className="flex items-center">
            <span className="text-gray-800 text-sm mr-4">{user.name}</span>
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              {user.role}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

