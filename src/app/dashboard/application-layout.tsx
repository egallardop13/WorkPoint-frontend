import ApplicationLayoutHeader from '@/components/application-layout/ApplicationLayoutHeader'
import ApplicationLayoutSidebarLinks from '@/components/application-layout/ApplicationLayoutSidebarLinks'
import ThemeToggle from '@/components/ThemeToggle'
import { Avatar } from '@/components/ui/avatar'
import { Dropdown, DropdownButton } from '@/components/ui/dropdown'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/ui/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeading,
  SidebarItem,
  SidebarSection,
  SidebarSpacer,
} from '@/components/ui/sidebar'
import { SidebarLayout } from '@/components/ui/sidebar-layout'
import AccountDropdownMenu from '@/components/application-layout/AccountDropdownMenu'
import SidebarUserInfo from '@/components/application-layout/SidebarUserInfo'
import { ChevronUpIcon } from '@heroicons/react/16/solid'
import { getUserFromToken } from '../api/auth/actions'
import { getDepartmentsInfo } from '../api/departments/actions'
import type { DepartmentInfo } from '@/types'

interface ApplicationLayoutProps {
  events: unknown[]
  children: React.ReactNode
}

export async function ApplicationLayout({ events, children }: ApplicationLayoutProps) {
  const tokenUser = await getUserFromToken()
  const userId = tokenUser?.userId ?? ''
  const userInitials = userId ? userId.toString().slice(0, 2).toUpperCase() : ''

  let topDepartments: DepartmentInfo[] = []
  try {
    const allDepartments = await getDepartmentsInfo()
    if (Array.isArray(allDepartments)) {
      topDepartments = allDepartments
        .sort((a, b) => (b.totalSalaryPaidToDepartment ?? 0) - (a.totalSalaryPaidToDepartment ?? 0))
        .slice(0, 4)
    }
  } catch {}
  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar initials={userInitials} square />
              </DropdownButton>
              <AccountDropdownMenu anchor="bottom end" />
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <ApplicationLayoutHeader />
          <SidebarBody>
            <ApplicationLayoutSidebarLinks />
            <SidebarSection className="max-lg:hidden">
              <SidebarHeading>Departments with Largest Budgets</SidebarHeading>

              {topDepartments.map((department, index) => (
                <SidebarItem key={(department.department ?? department.Department) + index} href={`/dashboard/departments/${encodeURIComponent(department.department ?? department.Department)}`}>
                  {department.department ?? department.Department}
                </SidebarItem>
              ))}
            </SidebarSection>

            <SidebarSpacer />

            <ThemeToggle />
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <SidebarUserInfo userId={userId} />
                <ChevronUpIcon />
              </DropdownButton>
              <AccountDropdownMenu anchor="top start" />
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  )
}
