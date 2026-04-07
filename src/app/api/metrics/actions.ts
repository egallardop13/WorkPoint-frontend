'use server'
import { backendFetch } from '@/lib/api'
import type { BudgetEntry, DepartmentInfo, DepartmentUsersResponse, MetricsResponse } from '@/types'

export async function getUsersByMonth(year: number, status: boolean): Promise<MetricsResponse> {
  const res = await backendFetch(`Company/GetMetrics/${year}/${status}`)
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

export async function getCompanyBudget(year: number): Promise<BudgetEntry[]> {
  const res = await backendFetch(`Company/GetBudget/${year}`)
  return res.json()
}
