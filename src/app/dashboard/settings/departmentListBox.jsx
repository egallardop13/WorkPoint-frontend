'use client'

import { Listbox, ListboxLabel, ListboxOption } from '@/components/ui/listbox'
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
import { useState } from 'react'

export function DepartmentListBox({ departments, defaultValue }) {
  let [department, setDepartment] = useState(defaultValue ? defaultValue : departments[0].Department)
  console.log('departments:', departments)
  console.log('department STATE:', department)
  const departmentIcons = {
    Services: <ShieldCheckIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    Support: <PhoneArrowDownLeftIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    Accounting: <CreditCardIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    'Product Management': <FolderIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    Sales: <CurrencyDollarIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    'Research and Development': <BeakerIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    Training: <BookOpenIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    Legal: <ScaleIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    'Human Resources': <UserGroupIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    'Business Development': <ArrowTrendingUpIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    Marketing: <TagIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    Engineering: <CogIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
  }

  return (
    <div className="">
      <Listbox
        aria-label="Department"
        name="department"
        placeholder="department"
        // by="department"
        value={department}
        onChange={(department) => setDepartment(department)}
        className=""
      >
        {departments.map((department) => (
          <ListboxOption key={department.Department} value={department.Department}>
            {/* <img className="w-5 sm:w-4" src={country.flagUrl} alt="" /> */}
            {departmentIcons[department.Department]}
            <ListboxLabel>{department.Department}</ListboxLabel>
          </ListboxOption>
        ))}
      </Listbox>
    </div>
  )
}
