'use server'
import { backendFetch } from '@/lib/api'
import { revalidatePath } from 'next/cache'
import type { UpsertUserPayload } from '@/types'

export async function UpsertUser(upsert: UpsertUserPayload) {
  const payload = {
    ...upsert,
    salary: Number(upsert.salary),
    active: upsert.active === 'true' ? true : upsert.active === 'false' ? false : upsert.active,
  }

  const res = await backendFetch('/UserComplete/UpsertUser/', {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

  const data = await res.json()
  revalidatePath('/dashboard', 'layout')
  return { ...data, status: res.status }
}

export async function deleteUser(userId: string | number) {
  const res = await backendFetch(`/UserComplete/DeleteUser/${userId}`, {
    method: 'DELETE',
  })

  const message = await res.json()
  revalidatePath('/dashboard', 'layout')
  return { status: res.status, message }
}
