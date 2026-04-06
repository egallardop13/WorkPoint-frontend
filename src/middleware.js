import { NextResponse } from 'next/server'

function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (!payload?.exp) return false
    return payload.exp < Math.floor(Date.now() / 1000)
  } catch {
    return true
  }
}

export async function middleware(req) {
  const accessToken = req.cookies.get('authToken')?.value
  const refreshToken = req.cookies.get('refreshToken')?.value

  if (accessToken && !isTokenExpired(accessToken)) {
    return NextResponse.next()
  }

  if (refreshToken) {
    try {
      const res = await fetch(`${process.env.NEXT_BACKEND_URL}/Auth/Refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      })

      if (res.ok) {
        const { token, refreshToken: newRefreshToken } = await res.json()
        const response = NextResponse.next()

        response.cookies.set('authToken', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
        })
        response.cookies.set('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        })

        return response
      }
    } catch {}
  }

  const loginUrl = new URL('/login', req.url)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
