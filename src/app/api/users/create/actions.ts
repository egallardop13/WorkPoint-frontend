'use server'
import { backendFetch } from '@/lib/api'
import type { UpsertUserPayload } from '@/types'

export async function UpsertUser(upsert: UpsertUserPayload) {
  const payload = {
    ...upsert,
    active: upsert.active === 'true' ? true : upsert.active === 'false' ? false : upsert.active,
  }

  const res = await backendFetch('/UserComplete/UpsertUser/', {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

  const data = await res.json()
  return { ...data, status: res.status }
}

export async function deleteUser(userId: string | number) {
  const res = await backendFetch(`/UserComplete/DeleteUser/${userId}`, {
    method: 'DELETE',
  })

  const message = await res.json()
  return { status: res.status, message }
}
