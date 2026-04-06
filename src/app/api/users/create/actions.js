'use server'
import { backendFetch } from '@/lib/api'

export async function UpsertUser(upsert) {
  if (upsert.active === 'true') {
    upsert.active = true
  } else if (upsert.active === 'false') {
    upsert.active = false
  }

  const res = await backendFetch('/UserComplete/UpsertUser/', {
    method: 'PUT',
    body: JSON.stringify(upsert),
  })

  const data = await res.json()
  data.status = res.status
  return data
}

export async function deleteUser(userId) {
  const res = await backendFetch(`/UserComplete/DeleteUser/${userId}`, {
    method: 'DELETE',
  })

  const message = await res.json()
  return { status: res.status, message }
}
