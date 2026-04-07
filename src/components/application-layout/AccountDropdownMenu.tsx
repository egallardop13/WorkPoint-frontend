'use client'

import { logoutUser } from '@/app/api/auth/actions'
import { DropdownItem, DropdownLabel, DropdownMenu } from '@/components/ui/dropdown'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/16/solid'
import { useRouter } from 'next/navigation'

interface AccountDropdownMenuProps {
  anchor: string
}

function AccountDropdownMenu({ anchor }: AccountDropdownMenuProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await logoutUser()
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem onClick={handleSignOut}>
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}
export default AccountDropdownMenu
