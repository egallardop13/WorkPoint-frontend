'use server'
import { backendFetch } from '@/lib/api'
import type { DepartmentInfo, DepartmentUsersResponse } from '@/types'

export async function getDepartmentsInfo(): Promise<DepartmentInfo[]> {
  const res = await backendFetch('UserSalary/GetDepartmentsInfo/')
  return res.json()
}

export async function getDepartmentInfo(department: string): Promise<DepartmentInfo[]> {
  const res = await backendFetch(`UserSalary/GetDepartmentsInfo/${department}`)
  return res.json()
}

export async function fetchUsersinDepartment(
  department: string,
  page = 1,
  limit = 10,
  query = ''
): Promise<DepartmentUsersResponse> {
  const res = await backendFetch(
    `/UserJobInfo/GetUsersInDepartments/${department}/${page}/${limit}`
  )
  return res.json()
}
