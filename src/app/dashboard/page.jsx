import Pagination from '@/components/pagination/Pagination'
import Search from '@/components/Search'
import Sorting from '@/components/Sorting'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { Heading, Subheading } from '@/components/ui/heading'
import UsersTable from '@/components/UsersTable'
import { calculateRate, formatCurrency } from '@/lib/utils'
import { Suspense } from 'react'
import { checkUser } from '../api/auth/actions'
import { fetchCompanyInfo } from '../api/company/actions'
import { fetchUser, fetchUsers } from '../api/users/actions'

const sortValues = ['name', 'department', 'active']

export function Stat({ title, value, badgeType, formattedRate, subText }) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      <div className="mt-3 text-sm/6 sm:text-xs/6">
        {badgeType && (
          <>
            <Badge color={badgeType === 'positive' ? 'lime' : 'pink'}>{formattedRate}</Badge>{' '}
            <span className="text-zinc-500">of total employees</span>
          </>
        )}
        {subText && (
          <>
            <span className="text-zinc-500">{subText}</span>
          </>
        )}
      </div>
    </div>
  )
}

export default async function Home({ searchParams }) {
  const loggedInUserId = await checkUser()
  const user = await fetchUser(loggedInUserId)
  const loggedInUser = user[0]

  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1
  const query = searchParams.query || ''
  const sort = searchParams.sort || ''

  const users = await fetchUsers(page, 10, query, sort)

  const data = JSON.parse(users.arrayUserComplete)

  const { totalBudget, totalUsers, totalActiveUsers, totalInactiveUsers } = await fetchCompanyInfo()

  const activeUsersRate = calculateRate(totalUsers, totalActiveUsers)
  const inactiveUsersRate = calculateRate(totalUsers, totalInactiveUsers)

  return (
    <>
      <Heading>Good afternoon, {loggedInUser.firstName}</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total budget" value={formatCurrency(totalBudget)} subText="Allocated across all departments" />
        <Stat title="Total Employees" value={totalUsers} subText="All registered employees" />
        <Stat
          title="Total Active Employees"
          value={totalActiveUsers}
          badgeType="positive"
          formattedRate={`${activeUsersRate}%`}
        />
        <Stat
          title="Total Inactive Employees"
          value={totalInactiveUsers}
          badgeType="negative"
          formattedRate={`${inactiveUsersRate}%`}
        />
      </div>
      <Subheading className="mt-14">Users</Subheading>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <div className="mt-4 flex max-w-xl gap-4">
            <Search placeholder="Search users&hellip;" />
            <Sorting values={sortValues} variant="home" />
          </div>
        </div>
        <Button href="/dashboard/users/create">Create user</Button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <UsersTable users={data} />
      </Suspense>

      <Pagination totalPages={users.totalPages} />
    </>
  )
}
