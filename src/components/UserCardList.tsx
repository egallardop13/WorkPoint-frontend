import { Badge } from '@/components/ui/badge'
import { Divider } from '@/components/ui/divider'
import { Link } from '@/components/ui/link'
import { UserPascalCase } from '@/types/api'

interface UserCardListProps {
  users: UserPascalCase[]
}

export default function UserCardList({ users }: UserCardListProps) {
  return (
    <ul className="mt-6">
      {users.map((user, index) => (
        <li key={user.UserId}>
          <Divider soft={index > 0} />
          <Link
            href={`/dashboard/users/${user.UserId}`}
            className="block py-4"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm/6 font-semibold text-zinc-950 dark:text-white">
                {user.FirstName} {user.LastName}
              </div>
              <Badge color={user.Active ? 'lime' : 'pink'}>
                {user.Active ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <div className="mt-1 text-xs/6 text-zinc-500">
              {user.JobTitle}
            </div>
            <div className="mt-0.5 text-xs/6 text-zinc-400 dark:text-zinc-500">
              {user.Department}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
