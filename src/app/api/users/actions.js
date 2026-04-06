'use server'
import { backendFetch } from '@/lib/api'

export async function fetchUsers(page = 1, limit = 10, query = '', sort = '') {
  const res = await backendFetch(
    `UserComplete/GetUsersWithPagination/${page}/${limit}?query=${query}&sort=${sort}`
  )
  return res.json()
}

export async function fetchUser(userId = '') {
  const res = await backendFetch(`/UserComplete/GetUsers/${userId}/false`)
  return res.json()
}
