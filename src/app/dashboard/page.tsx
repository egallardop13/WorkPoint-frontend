import Pagination from '@/components/pagination/Pagination'
import Search from '@/components/Search'
import Sorting from '@/components/Sorting'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { Heading, Subheading } from '@/components/ui/heading'
import UserCardList from '@/components/UserCardList'
import UsersTable from '@/components/UsersTable'
import { calculateRate, formatCurrency } from '@/lib/utils'
import StatCard from '@/components/metrics/StatCard'
import { Suspense } from 'react'
import { checkUser } from '../api/auth/actions'
import { fetchCompanyInfo } from '../api/company/actions'
import { getUsersByMonth } from '../api/metrics/actions'
import { fetchUser, fetchUsers } from '../api/users/actions'

const sortValues = ['name', 'department', 'active']

interface StatProps {
  title: string
  value: string | number
  badgeType?: string
  formattedRate?: string
  subText?: string
  change?: string
}

export function Stat({ title, value, badgeType, formattedRate, subText }: StatProps) {
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

export default async function Home({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const loggedInUserId = await checkUser()

  const rawPage = searchParams.page
  const page = typeof rawPage === 'string' ? parseInt(rawPage, 10) : 1
  const query = typeof searchParams.query === 'string' ? searchParams.query : ''
  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : ''

  const [user, users, companyInfo, usersJoined2024, usersLeft2024] = await Promise.all([
    fetchUser(loggedInUserId ?? ''),
    fetchUsers(page, 10, query, sort),
    fetchCompanyInfo(),
    getUsersByMonth(2024, true),
    getUsersByMonth(2024, false),
  ])

  const loggedInUser = Array.isArray(user) ? user[0] : null
  const data = users?.arrayUserComplete ? JSON.parse(users.arrayUserComplete) : []
  const { totalBudget, totalUsers, totalActiveUsers, totalInactiveUsers } = companyInfo

  const activeUsersRate = calculateRate(totalUsers, totalActiveUsers)
  const inactiveUsersRate = calculateRate(totalUsers, totalInactiveUsers)

  const totalJoined2024 = usersJoined2024.joinedOrLeftYearly
  const totalLeft2024 = usersLeft2024.joinedOrLeftYearly
  const totalEmployees2024 = usersJoined2024.totalEmployees
  const joinedPercentage2024 = ((totalJoined2024 / totalEmployees2024) * 100).toFixed(2)
  const exitedPercentage2024 = ((totalLeft2024 / totalEmployees2024) * 100).toFixed(2)

  return (
    <>
      <Heading>Good afternoon{loggedInUser ? `, ${loggedInUser.firstName}` : ''}</Heading>
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
      <div className="mt-10 flex items-end justify-between">
        <Subheading>Workforce Trends</Subheading>
        <Button href="/dashboard/metrics" outline>
          View all metrics
        </Button>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-zinc-950/5 dark:border-white/10">
          <StatCard
            title="Employees Joined"
            value={totalJoined2024}
            interval="2024"
            trend="up"
            data={usersJoined2024.monthlyBreakdown}
            rate={joinedPercentage2024}
          />
        </div>
        <div className="rounded-lg border border-zinc-950/5 dark:border-white/10">
          <StatCard
            title="Employees Exited"
            value={totalLeft2024}
            interval="2024"
            trend="down"
            data={usersLeft2024.monthlyBreakdown}
            rate={exitedPercentage2024}
          />
        </div>
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
      <Suspense
        fallback={
          <div className="mt-6 space-y-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 py-3">
                <div className="h-4 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-4 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-4 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="ml-auto h-4 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
              </div>
            ))}
          </div>
        }
      >
        <div className="hidden sm:block">
          <UsersTable users={data} />
        </div>
        <div className="sm:hidden">
          <UserCardList users={data} />
        </div>
      </Suspense>

      <Pagination totalPages={users.totalPages} />
    </>
  )
}
