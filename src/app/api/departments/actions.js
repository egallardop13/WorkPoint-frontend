'use server'
import { backendFetch } from '@/lib/api'

export async function getDepartmentsInfo() {
  const res = await backendFetch('UserSalary/GetDepartmentsInfo/')
  return res.json()
}

export async function getDepartmentInfo(department) {
  const res = await backendFetch(`UserSalary/GetDepartmentsInfo/${department}`)
  return res.json()
}

export async function fetchUsersinDepartment(department, page = 1, limit = 10, query = '') {
  const res = await backendFetch(
    `/UserJobInfo/GetUsersInDepartments/${department}/${page}/${limit}`
  )
  return res.json()
}
