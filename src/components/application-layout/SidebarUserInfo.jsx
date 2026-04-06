'use client'

import { useEffect, useState } from 'react'
import { Avatar } from '@/components/ui/avatar'
import { fetchUser } from '@/app/api/users/actions'

export default function SidebarUserInfo({ userId }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!userId) return
    fetchUser(userId)
      .then((data) => {
        const u = Array.isArray(data) ? data[0] : null
        if (u) setUser(u)
      })
      .catch(() => {})
  }, [userId])

  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`
    : ''

  return (
    <span className="flex min-w-0 items-center gap-3">
      <Avatar initials={initials} className="size-10" square alt="" />
      <span className="min-w-0">
        <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
          {user?.firstName ?? 'Account'}
        </span>
        <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
          {user?.email ?? ''}
        </span>
      </span>
    </span>
  )
}
