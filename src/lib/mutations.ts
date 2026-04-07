import { deleteUser, UpsertUser } from '@/app/api/users/create/actions'
import { useMutation } from '@tanstack/react-query'
import type { UpsertUserPayload } from '@/types'

export function useUpsertUser() {
  return useMutation({
    mutationFn: (userData: UpsertUserPayload) => UpsertUser(userData),
  })
}

export function useDeleteUser() {
  return useMutation({
    mutationFn: (userId: string | number) => deleteUser(userId),
  })
}
