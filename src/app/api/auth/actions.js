'use server'

import { cookies } from 'next/headers'

function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch {
    return null
  }
}

export async function loginUser(credentials) {
  const response = await fetch(`${process.env.NEXT_BACKEND_URL}/Auth/Login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error('Invalid credentials')
  }

  const { token, refreshToken } = await response.json()

  cookies().set('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })

  cookies().set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  return { success: true }
}

export async function logoutUser() {
  cookies().delete('authToken', { path: '/' })
  cookies().delete('refreshToken', { path: '/' })
  return { success: true }
}

export async function checkUser() {
  const authToken = cookies().get('authToken')?.value
  if (!authToken) {
    return null
  }

  const decoded = decodeToken(authToken)
  return decoded?.userId ?? null
}

export async function getUserFromToken() {
  const authToken = cookies().get('authToken')?.value
  if (!authToken) return null
  return decodeToken(authToken)
}
