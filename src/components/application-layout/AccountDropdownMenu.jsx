'use client'

import { useRouter } from 'next/navigation'

const { logoutUser } = require('@/app/api/auth/actions')
const { DropdownMenu, DropdownItem, DropdownLabel } = require('../ui/dropdown')
const { ArrowRightStartOnRectangleIcon } = require('@heroicons/react/16/solid')

async function AccountDropdownMenu({ anchor }) {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      results = await logoutUser()
    } catch (error) {
      console.log('Error signing out:', error)
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
      <DropdownItem>
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel
          onClick={() => {
            handleSignOut(), router.push('/login')
          }}
        >
          Sign out
        </DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}
export default AccountDropdownMenu
