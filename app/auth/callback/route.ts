import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const supabase = createClient()

  // Check existing session
  const { data: { session } } = await supabase.auth.getSession()
  
  if (session) {
    return NextResponse.redirect(new URL('/dashboard', requestUrl.origin))
  }

  if (!code) {
    return NextResponse.redirect(new URL('/', requestUrl.origin))
  }

  try {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) throw error
    return NextResponse.redirect(new URL('/dashboard', requestUrl.origin))
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.redirect(
      new URL('/?error=Authentication failed', requestUrl.origin)
    )
  }
}