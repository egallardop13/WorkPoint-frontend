import { deleteUser, UpsertUser } from '@/app/api/users/create/actions'
import { useMutation } from '@tanstack/react-query'

export function useUpsertUser() {
  return useMutation({
    mutationFn: (userData) => UpsertUser(userData),
  })
}

export function useDeleteUser() {
  return useMutation({
    mutationFn: (userId) => deleteUser(userId),
  })
}
