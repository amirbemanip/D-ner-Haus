import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protected routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/seller')) {
    const authToken = request.cookies.get('auth_token')?.value
    const adminPassword = process.env.ADMIN_PASSWORD || 'donerhaus2026'

    if (authToken !== adminPassword) {
      const url = new URL('/login', request.url)
      url.searchParams.set('from', pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/seller/:path*', '/admin', '/seller'],
}
