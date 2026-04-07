import { checkUser } from '@/app/api/auth/actions'
import { fetchCompanyInfo } from '@/app/api/company/actions'
import { getDepartmentsInfo } from '@/app/api/departments/actions'
import { fetchUser } from '@/app/api/users/actions'
import AppearanceSettings from '@/components/settings/AppearanceSettings'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/ui/description-list'
import { Divider } from '@/components/ui/divider'
import { Heading, Subheading } from '@/components/ui/heading'
import { Link } from '@/components/ui/link'
import { TextLink } from '@/components/ui/text'
import { calculateRate, formatCurrency } from '@/lib/utils'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Settings',
}

export default async function Settings() {
  const loggedInUserId = await checkUser()
  if (!loggedInUserId) notFound()

  const [userData, companyInfo, departments] = await Promise.all([
    fetchUser(loggedInUserId),
    fetchCompanyInfo(),
    getDepartmentsInfo(),
  ])

  const user = Array.isArray(userData) ? userData[0] : null
  if (!user) notFound()

  const { totalBudget, totalUsers, totalActiveUsers, totalInactiveUsers } = companyInfo
  const activeRate = calculateRate(totalUsers, totalActiveUsers)
  const inactiveRate = calculateRate(totalUsers, totalInactiveUsers)

  return (
    <div className="mx-auto max-w-4xl">
      <Heading>Settings</Heading>
      <Divider className="my-6" />

      {/* My Profile */}
      <section>
        <div className="flex items-center justify-between">
          <Subheading>My Profile</Subheading>
          <Button href={`/dashboard/users/${user.userId}/edit`} outline>
            Edit Profile
          </Button>
        </div>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Name</DescriptionTerm>
          <DescriptionDetails>{user.firstName} {user.lastName}</DescriptionDetails>
          <DescriptionTerm>Email</DescriptionTerm>
          <DescriptionDetails>{user.email}</DescriptionDetails>
          <DescriptionTerm>Job Title</DescriptionTerm>
          <DescriptionDetails>{user.jobTitle}</DescriptionDetails>
          <DescriptionTerm>Department</DescriptionTerm>
          <DescriptionDetails>
            <TextLink href={`/dashboard/departments/${encodeURIComponent(user.department)}`}>
              {user.department}
            </TextLink>
          </DescriptionDetails>
          <DescriptionTerm>Salary</DescriptionTerm>
          <DescriptionDetails>{formatCurrency(user.salary)}</DescriptionDetails>
          <DescriptionTerm>Status</DescriptionTerm>
          <DescriptionDetails>
            <Badge color={user.active ? 'lime' : 'pink'}>
              {user.active ? 'Active' : 'Inactive'}
            </Badge>
          </DescriptionDetails>
          <DescriptionTerm>Date Hired</DescriptionTerm>
          <DescriptionDetails>{new Date(user.dateHired).toLocaleDateString()}</DescriptionDetails>
        </DescriptionList>
      </section>

      {/* Company Overview */}
      <section className="mt-12">
        <Subheading>Company Overview</Subheading>
        <Divider className="mt-4" />
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <div className="text-sm/6 font-medium text-zinc-500 dark:text-zinc-400">Total Budget</div>
            <div className="mt-1 text-2xl/8 font-semibold">{formatCurrency(totalBudget)}</div>
          </div>
          <div>
            <div className="text-sm/6 font-medium text-zinc-500 dark:text-zinc-400">Total Employees</div>
            <div className="mt-1 text-2xl/8 font-semibold">{totalUsers}</div>
          </div>
          <div>
            <div className="text-sm/6 font-medium text-zinc-500 dark:text-zinc-400">Active Employees</div>
            <div className="mt-1 text-2xl/8 font-semibold">
              {totalActiveUsers}{' '}
              <Badge color="lime">{activeRate}%</Badge>
            </div>
          </div>
          <div>
            <div className="text-sm/6 font-medium text-zinc-500 dark:text-zinc-400">Inactive Employees</div>
            <div className="mt-1 text-2xl/8 font-semibold">
              {totalInactiveUsers}{' '}
              <Badge color="pink">{inactiveRate}%</Badge>
            </div>
          </div>
        </div>

        <Subheading className="mt-8">Departments</Subheading>
        <Divider className="mt-4" />
        <ul className="mt-4 divide-y divide-zinc-950/5 dark:divide-white/5">
          {departments.map((dept) => (
            <li key={dept.department} className="flex items-center justify-between py-3">
              <Link
                href={`/dashboard/departments/${encodeURIComponent(dept.department)}`}
                className="text-sm/6 font-medium"
              >
                {dept.department}
              </Link>
              <span className="text-sm/6 text-zinc-500">
                {dept.activeEmployeeCount}/{dept.employeeCount} active
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Appearance */}
      <section className="mt-12">
        <Subheading>Appearance</Subheading>
        <Divider className="mt-4" />
        <div className="mt-6">
          <AppearanceSettings />
        </div>
      </section>
    </div>
  )
}
