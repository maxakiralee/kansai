import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Public routes: accessible without session
  const isPublic = (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/_logs') ||
    pathname === '/' ||
    pathname === '/login' ||
    pathname === '/auth/confirm' ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname.startsWith('/icons/') ||
    pathname.startsWith('/fonts/') ||
    pathname.startsWith('/textures/') ||
    pathname === '/manifest.json'
  )

  const res = NextResponse.next()

  // If on root or login and already authenticated, redirect to app home
  if (pathname === '/' || pathname === '/login') {
    try {
      const { createMiddlewareClient } = await import('@supabase/auth-helpers-nextjs')
      const supabase = createMiddlewareClient({ req, res })
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        const url = req.nextUrl.clone()
        url.pathname = '/trip/calendar'
        url.search = ''
        return NextResponse.redirect(url)
      }
    } catch {}
    return res
  }

  if (isPublic) return res

  // Protect all non-public routes: require Supabase session
  try {
    const { createMiddlewareClient } = await import('@supabase/auth-helpers-nextjs')
    const supabase = createMiddlewareClient({ req, res })
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      url.search = ''
      return NextResponse.redirect(url)
    }
  } catch {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    url.search = ''
    return NextResponse.redirect(url)
  }

  return res
}

export const config = {
  matcher: [
    '/((?!_next/|favicon.ico|robots.txt|icons/|fonts/|textures/|manifest.json).*)',
  ],
}