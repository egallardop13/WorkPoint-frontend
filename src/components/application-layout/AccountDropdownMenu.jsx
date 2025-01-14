'use client'

import { logoutUser } from '@/app/api/auth/actions'
import { DropdownItem, DropdownLabel, DropdownMenu } from '@/components/ui/dropdown'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/16/solid'
import { useRouter } from 'next/navigation'

function AccountDropdownMenu({ anchor }) {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      results = await logoutUser()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      {/* <DropdownItem href="#">
          <UserCircleIcon />
          <DropdownLabel>My account</DropdownLabel>
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem href="#">
          <ShieldCheckIcon />
          <DropdownLabel>Privacy policy</DropdownLabel>
          </DropdownItem>
          <DropdownItem href="#">
          <LightBulbIcon />
          <DropdownLabel>Share feedback</DropdownLabel>
          </DropdownItem>
          <DropdownDivider /> */}
      <DropdownItem
        onClick={() => {
          handleSignOut(), router.push('/login')
        }}
      >
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel
        // onClick={() => {
        //   handleSignOut(), router.push('/login')
        // }}
        >
          Sign out
        </DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}
export default AccountDropdownMenu
