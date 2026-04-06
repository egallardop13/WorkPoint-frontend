import { cookies } from 'next/headers'

const APP_URL =
  process.env.NEXT_APP_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export async function apiFetch(path, options = {}) {
  const authToken = cookies().get('authToken')?.value
  return fetch(`${APP_URL}${path}`, {
    cache: 'no-store',
    credentials: 'include',
    ...options,
    headers: {
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
}
