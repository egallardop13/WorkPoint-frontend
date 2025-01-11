'use server'
import { cookies } from 'next/headers'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export async function UpsertUser(upsert) {
  console.log('upsert in UpsertUser action:', upsert)
  const authToken = cookies().get('authToken')?.value

  if (!authToken) {
    throw new Error('Authorization token is missing')
  }

  const res = await fetch(`${baseUrl}/api/users/create/`, {
    method: 'PUT',
    cache: 'no-store',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(upsert),
  })

  if (!res.ok) {
    throw new Error(`Failed to upsert user. Status: ${res.status}`)
  }

  const data = await res.json()
  data.status = res.status
  console.log('data.status in UpsertUser action:', data.status)
  console.log('data in UpsertUser action:', data)

  return data
}

export async function deleteUser(userId) {
  const authToken = cookies().get('authToken')?.value
  if (!authToken) {
    return { status: 401, message: 'Unauthorized: No token provided' }
  }

  const res = await fetch(`${baseUrl}/api/users/${userId}`, {
    cache: 'no-store', // Ensures fresh data every time
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    method: 'DELETE',
  })

  const message = res.json()
  const status = res.status
  const result = { status, message }

  return result
}
