import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {

    const token = await getToken({ req })

    const pathname = req.nextUrl.pathname

    // Redirect authenticated users from / to /home
    if (pathname === "/" && token) {
        return NextResponse.redirect(new URL('/home', req.url))
    }

    // Protected routes that require authentication
    const securePaths = ["/home", "/settings", "/admin", "/create"]
    const isSecurePath = securePaths.some(path => pathname.startsWith(path))

    // Protect API routes
    const isApiPath = pathname.startsWith("/api")
    const isAuthPath = pathname.startsWith("/api/auth")
    
    if (isApiPath && !isAuthPath && !token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Redirect unauthenticated users away from secure paths
    if (isSecurePath && !token) {
        return NextResponse.redirect(new URL('/', req.url))
    }
}