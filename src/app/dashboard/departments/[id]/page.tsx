import { fetchUsersinDepartment, getDepartmentInfo } from '@/app/api/departments/actions'
import DepartmentUserCardList from '@/components/DepartmentUserCardList'
import DepartmentUsersTable from '@/components/DepartmentUsersTable'
import Pagination from '@/components/pagination/Pagination'
import Search from '@/components/Search'
import { Badge } from '@/components/ui/badge'
import { Divider } from '@/components/ui/divider'
import { Heading, Subheading } from '@/components/ui/heading'
import { Link } from '@/components/ui/link'
import { Select } from '@/components/ui/select'
import { calculateRate, formatCurrency } from '@/lib/utils'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import {
  ArrowTrendingUpIcon,
  BeakerIcon,
  BookOpenIcon,
  CogIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  FolderIcon,
  PhoneArrowDownLeftIcon,
  ScaleIcon,
  ShieldCheckIcon,
  TagIcon,
  UserGroupIcon,
} from '@heroicons/react/20/solid'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { id: string } }) {
  let departmentName = decodeURIComponent(params.id)
  let department = await getDepartmentInfo(departmentName)
  let titleName = `${department[0].department} Department`

  if (titleName.length > 20) {
    titleName = `${titleName.slice(0, 17)}...`
  }
  return {
    title: titleName,
  }
}

function Stat({ title, value, badgeType, formattedRate, subText }: { title: string; value: string | number; badgeType?: string; formattedRate?: string; subText?: string }) {
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
export default async function Department({ params, searchParams }: { params: { id: string }; searchParams: Record<string, string | string[] | undefined> }) {
  let departmentName = decodeURIComponent(params.id)
  let data = await getDepartmentInfo(departmentName)

  let department = data[0]

  const rawPage = searchParams.page
  const page = typeof rawPage === 'string' ? parseInt(rawPage, 10) : 1
  const rawQuery = searchParams.query
  const query = typeof rawQuery === 'string' ? rawQuery : ''

  const usersInfo = await fetchUsersinDepartment(department.department, page, 10, query)

  const users = usersInfo.users
  const totalActiveSalary = usersInfo.totalActiveSalary
  const totalInactiveSalary = usersInfo.totalInactiveSalary

  const totalUsers = department.employeeCount
  const totalActiveUsers = department.activeEmployeeCount
  const totalInactiveUsers = totalUsers - totalActiveUsers

  const activeUsersRate = calculateRate(totalUsers, totalActiveUsers)
  const inactiveUsersRate = calculateRate(totalUsers, totalInactiveUsers)

  if (!department) {
    notFound()
  }

  const departmentIcons: Record<string, React.ReactNode> = {
    Services: <ShieldCheckIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
    Support: <PhoneArrowDownLeftIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
    Accounting: <CreditCardIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
    'Product Management': <FolderIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
    Sales: <CurrencyDollarIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
    'Research and Development': <BeakerIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
    Training: <BookOpenIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
    Legal: <ScaleIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
    'Human Resources': <UserGroupIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
    'Business Development': <ArrowTrendingUpIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
    Marketing: <TagIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
    Engineering: <CogIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
    Backend: <CogIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
  }

  return (
    <>
      <div>
        <Link
          href="/dashboard/departments"
          className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
        >
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Departments
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="w-20 shrink-0 rounded-lg border border-zinc-950/5 sm:w-32 dark:border-white/10">
            {departmentIcons[department.department]}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Heading>{department.department}</Heading>
              {totalActiveUsers > totalInactiveUsers ? (
                <Badge className="max-sm:hidden" color="lime">
                  Healthy Budget Allocation
                </Badge>
              ) : (
                <Badge className="max-sm:hidden" color="pink">
                  Budget Needs Attention
                </Badge>
              )}
            </div>
            <div className="mt-2 text-sm/6 text-zinc-500">
              {totalActiveUsers} active employees <span aria-hidden="true">·</span> {totalInactiveUsers} inactive
              employees <span aria-hidden="true">·</span> {totalUsers} total employees
            </div>
            {totalActiveUsers > totalInactiveUsers ? (
              <Badge className="mt-2 sm:hidden" color="lime">
                Healthy Budget Allocation
              </Badge>
            ) : (
              <Badge className="mt-2 sm:hidden" color="pink">
                Budget Needs Attention
              </Badge>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        <Stat title="Total Budget" value={formatCurrency(department.totalSalary)} />
        <Stat
          title="Active Employee Budget"
          value={formatCurrency(totalActiveSalary)}
          badgeType="positive"
          formattedRate={`${activeUsersRate}%`}
        />

        <Stat
          title="Inactive Employee Budget"
          value={formatCurrency(totalInactiveSalary)}
          badgeType="negative"
          formattedRate={`${inactiveUsersRate}%`}
        />
      </div>
      <Subheading className="mt-12">Employees</Subheading>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <div className="mt-4 flex max-w-xl gap-4">
            <Search placeholder="Search employees&hellip;" />
            <div>
              <Select name="sort_by">
                <option value="name" className="">
                  Sort by name
                </option>
                <option value="date" className="">
                  Sort by salary
                </option>
                <option value="status" className="">
                  Sort by active
                </option>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
        <DepartmentUsersTable users={users} />
      </div>
      <div className="sm:hidden">
        <DepartmentUserCardList users={users} />
      </div>
      <Pagination totalPages={usersInfo.totalPages} />
    </>
  )
}
