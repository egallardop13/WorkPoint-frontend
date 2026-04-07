import { Badge } from '@/components/ui/badge'
import { Divider } from '@/components/ui/divider'
import { Link } from '@/components/ui/link'
import { formatCurrency } from '@/lib/utils'
import { DepartmentUser } from '@/types/api'

interface DepartmentUserCardListProps {
  users: DepartmentUser[]
}

export default function DepartmentUserCardList({ users }: DepartmentUserCardListProps) {
  return (
    <ul className="mt-6">
      {users.map((user, index) => {
        const id = user.UserId ?? user.userId ?? user.id
        return (
          <li key={id}>
            <Divider soft={index > 0} />
            <Link
              href={`/dashboard/users/${id}`}
              className="block py-4"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm/6 font-semibold text-zinc-950 dark:text-white">
                  {user.firstName} {user.lastName}
                </div>
                <Badge color={user.active ? 'lime' : 'pink'}>
                  {user.active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <div className="mt-1 text-xs/6 text-zinc-500">
                {user.JobTitle}
              </div>
              <div className="mt-0.5 text-xs/6 text-zinc-400 dark:text-zinc-500">
                {formatCurrency(user.salary)}
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
