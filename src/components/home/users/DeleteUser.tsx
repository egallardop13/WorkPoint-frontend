'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogActions, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { useDeleteUser } from '@/lib/mutations'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

export function DeleteUser({ ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { outline?: boolean; plain?: boolean; color?: string }) {
  let [isOpen, setIsOpen] = useState(false)
  const params = useParams()
  const router = useRouter()
  const userId = params.id as string
  const deleteMutation = useDeleteUser()

  async function HandleSubmit() {
    try {
      await deleteMutation.mutateAsync(userId)
      toast.success('Employee deleted successfully')
      setIsOpen(false)
      router.push('/dashboard')
    } catch (error) {
      const err = error as Error
      toast.error(err.message || 'Failed to delete employee')
    }
  }

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)} {...props} />
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this user? This action is permanent and cannot be undone.
        </DialogDescription>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={HandleSubmit}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
