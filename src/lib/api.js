import { cookies } from 'next/headers'

const BACKEND_URL = process.env.NEXT_BACKEND_URL

export async function backendFetch(path, options = {}) {
  const authToken = cookies().get('authToken')?.value

  const res = await fetch(`${BACKEND_URL}${path}`, {
    cache: 'no-store',
    ...options,
    headers: {
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText} — ${path}`)
  }

  return res
}
