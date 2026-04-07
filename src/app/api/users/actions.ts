'use server'
import { backendFetch } from '@/lib/api'
import type { PaginatedUsersResponse, User } from '@/types'

export async function fetchUsers(
  page = 1,
  limit = 10,
  query = '',
  sort = ''
): Promise<PaginatedUsersResponse> {
  const res = await backendFetch(
    `UserComplete/GetUsersWithPagination/${page}/${limit}?query=${query}&sort=${sort}`
  )
  return res.json()
}

export async function fetchUser(userId: string | number = ''): Promise<User[]> {
  const res = await backendFetch(`/UserComplete/GetUsers/${userId}/false`)
  return res.json()
}
