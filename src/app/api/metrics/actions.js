import { cookies } from 'next/headers'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' // Use env

export async function getUsersByMonth(year, status) {
  const authToken = cookies().get('authToken')?.value
  const res = await fetch(`${baseUrl}/api/metrics/?year=${year}&status=${status}`, {
    cache: 'no-store', // Ensures fresh data every time
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  const data = await res.json()

  return data
}

export async function getDepartmentInfo(department) {
  const authToken = cookies().get('authToken')?.value
  const res = await fetch(`${baseUrl}/api/departments?department=${department}`, {
    cache: 'no-store', // Ensures fresh data every time
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  const data = await res.json()

  return data
}

export async function fetchUsersinDepartment(department, page = 1, limit = 10, query = '') {
  const authToken = cookies().get('authToken')?.value
  const res = await fetch(`${baseUrl}/api/departments/${department}/users?page=${page}&limit=${limit}&query=${query}`, {
    cache: 'no-store', // Ensures fresh data every time
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  const data = await res.json()
  return data
}

export async function getCompanyBudget(year) {
  const authToken = cookies().get('authToken')?.value
  const res = await fetch(`${baseUrl}/api/metrics/company?year=${year}`, {
    cache: 'no-store', // Ensures fresh data every time
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  const data = await res.json()
  return data
}
