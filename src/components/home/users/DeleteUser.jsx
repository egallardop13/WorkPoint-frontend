'use client'

import { deleteUser } from '@/app/api/users/create/actions'
import { Button } from '@/components/ui/button'
import { Dialog, DialogActions, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export function DeleteUser({ amount, ...props }) {
  let [isOpen, setIsOpen] = useState(false)
  const params = useParams()
  const router = useRouter()
  const userId = params.id

  async function HandleSubmit() {
    try {
      await deleteUser(userId)
      setIsOpen(false)
      router.push('/dashboard')
    } catch (error) {
      console.error('Error deleting user:', error)
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
