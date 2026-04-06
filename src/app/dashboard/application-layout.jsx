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
import { ChevronUpIcon } from '@heroicons/react/16/solid'
import { getUserFromToken } from '../api/auth/actions'

export async function ApplicationLayout({ events, children }) {
  const tokenUser = await getUserFromToken()
  const firstName = tokenUser?.firstName || tokenUser?.given_name || ''
  const lastName = tokenUser?.lastName || tokenUser?.family_name || ''
  const email = tokenUser?.email || ''
  const userInitials = `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`

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
                <SidebarItem key={department.Department + index} href={`/departments/${department.Department}`}>
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
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar initials={userInitials} className="size-10" square alt="" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                      {firstName}
                    </span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      {email}
                    </span>
                  </span>
                </span>
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
