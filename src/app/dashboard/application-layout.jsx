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
import { getTopSalaryAllocatingDepartments } from '@/lib/mockApi.js/mockApi'

import AccountDropdownMenu from '@/components/application-layout/AccountDropdownMenu'
import SidebarUserInfo from '@/components/application-layout/SidebarUserInfo'
import { ChevronUpIcon } from '@heroicons/react/16/solid'
import { getUserFromToken } from '../api/auth/actions'

export async function ApplicationLayout({ events, children }) {
  const tokenUser = await getUserFromToken()
  const userId = tokenUser?.userId ?? ''
  const userInitials = userId ? userId.toString().slice(0, 2).toUpperCase() : ''

  const topDepartments = await getTopSalaryAllocatingDepartments()
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
                <SidebarItem key={department.Department + index} href={`/dashboard/departments/${encodeURIComponent(department.Department)}`}>
                  {department.Department}
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
