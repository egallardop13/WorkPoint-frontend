import { cookies } from 'next/headers'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' // Use env

export async function fetchUsers(page = 1, limit = 10, query = '', sort = '') {
  const authToken = cookies().get('authToken')?.value
  const res = await fetch(`${baseUrl}/api/users?page=${page}&limit=${limit}&query=${query}&sort=${sort}`, {
    cache: 'no-store', // Ensures fresh data every time
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  const data = await res.json()

  return data
}

export async function fetchUser(userId = '') {
  const authToken = cookies().get('authToken')?.value
  const res = await fetch(`${baseUrl}/api/users/${userId}`, {
    cache: 'no-store', // Ensures fresh data every time
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  const data = await res.json()

  return data
}
