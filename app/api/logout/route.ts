import { NextResponse } from "next/server"
import { clearSession } from "@/lib/session"

export async function POST() {
  try {
    await clearSession()
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const redirectUrl = new URL('/login', baseUrl)
    
    return NextResponse.redirect(redirectUrl, {
      status: 302
    })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    )
  }
}