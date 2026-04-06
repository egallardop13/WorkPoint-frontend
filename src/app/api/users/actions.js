'use server'
import { apiFetch } from '@/lib/api'

export async function fetchUsers(page = 1, limit = 10, query = '', sort = '') {
  const res = await apiFetch(`/api/users?page=${page}&limit=${limit}&query=${query}&sort=${sort}`)
  return res.json()
}

export async function fetchUser(userId = '') {
  const res = await apiFetch(`/api/users/${userId}`)
  return res.json()
}
