import { fetchCompanyInfo } from '@/app/api/company/actions'
import { getDepartmentInfo } from '@/app/api/departments/actions'
import { fetchUser } from '@/app/api/users/actions'
import { DeleteUser } from '@/components/home/users/DeleteUser'
import UsersMetrics from '@/components/home/users/UsersMetrics'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/ui/description-list'
import { Divider } from '@/components/ui/divider'
import { Heading, Subheading } from '@/components/ui/heading'
import { Link } from '@/components/ui/link'
import { TextLink } from '@/components/ui/text'
import { formatCurrency } from '@/lib/utils'
import { BanknotesIcon, BriefcaseIcon, BuildingOffice2Icon, ChevronLeftIcon } from '@heroicons/react/16/solid'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  let user = await fetchUser(params.id)
  let titleName = `${user.firstName} ${user.lastName}`

  if (titleName.length > 20) {
    titleName = `${titleName.slice(0, 17)}...`
  }

  return {
    title: user ? `Overview: ${titleName} - WorkPoint` : 'WorkPoint',
  }
}

export default async function User({ params }) {
  let data = await fetchUser(params.id)
  let user = data[0]
  console.log('user sdfwef:', user)
  let departmentData = await getDepartmentInfo(user.department)
  let departmentInfo = departmentData[0]

  let company = await fetchCompanyInfo()
  let totalSalary = company.totalBudget
  let totalEmployeeCount = company.totalUsers

  const companyAverageSalary = totalSalary / totalEmployeeCount

  if (!user) {
    notFound()
  }

  const userStatus = user.active ? 'Active' : 'Inactive'
  const userFullName = `${user.firstName} ${user.lastName}`

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Home
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>{userFullName}</Heading>
          <Badge color={userStatus === 'Active' ? 'lime' : 'pink'}>{userStatus}</Badge>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BanknotesIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              {console.log('user.salary:', user.salary)}
              <span>{formatCurrency(user.salary)}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BriefcaseIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span className="inline-flex gap-3">{user.jobTitle}</span>
            </span>
            <Link
              className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white"
              href={`/dashboard/departments/${encodeURIComponent(user.department)}`}
            >
              <BuildingOffice2Icon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>{user.department}</span>
            </Link>
          </div>
          <div className="flex gap-4">
            <DeleteUser outline>Delete</DeleteUser>
            <Button href={`/dashboard/users/${user.userId}/edit`}>Edit Profile</Button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Subheading>Employee Summary</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Name</DescriptionTerm>
          <DescriptionDetails>{userFullName}</DescriptionDetails>
          <DescriptionTerm>Job Title</DescriptionTerm>
          <DescriptionDetails>{user.jobTitle}</DescriptionDetails>

          <DescriptionTerm>Department</DescriptionTerm>
          <DescriptionDetails>
            <TextLink href={`/dashboard/departments/${encodeURIComponent(user.department)}`}>
              {user.department}
            </TextLink>
          </DescriptionDetails>

          <DescriptionTerm>Email</DescriptionTerm>
          <DescriptionDetails>{user.email}</DescriptionDetails>
        </DescriptionList>
      </div>
      <div className="mt-12">
        <Subheading>Insights</Subheading>
        <Divider className="mt-4" />
        {console.log('departmentInfo in Page for Bento:', departmentInfo)}
        <UsersMetrics
          minSalary={departmentInfo.minSalary}
          maxSalary={departmentInfo.maxSalary}
          avgSalary={departmentInfo.avgSalary}
          companyAverageSalary={companyAverageSalary}
          departmentTotalSalary={departmentInfo.totalSalary}
          user={user}
        />
      </div>
    </>
  )
}
