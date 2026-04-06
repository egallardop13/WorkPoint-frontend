'use server'
import { apiFetch } from '@/lib/api'

export async function UpsertUser(upsert) {
  const res = await apiFetch('/api/users/create/', {
    method: 'PUT',
    body: JSON.stringify(upsert),
  })

  if (!res.ok) {
    throw new Error(`Failed to upsert user. Status: ${res.status}`)
  }

  const data = await res.json()
  data.status = res.status
  return data
}

export async function deleteUser(userId) {
  const res = await apiFetch(`/api/users/${userId}`, {
    method: 'DELETE',
  })

  const message = await res.json()
  return { status: res.status, message }
}
