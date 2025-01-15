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
import { checkUser } from '../api/auth/actions'
import { fetchUser } from '../api/users/actions'

export async function ApplicationLayout({ events, children }) {
  const loggedInUserId = await checkUser()
  const user = await fetchUser(loggedInUserId)
  const loggedInUser = user[0]
  console.log('loggedin user:', loggedInUser)
  const topDepartments = await getTopSalaryAllocatingDepartments()
  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  square
                />
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
                  <Avatar
                    src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-10"
                    square
                    alt=""
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                      {loggedInUser?.firstName}
                    </span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      {loggedInUser?.email}
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
