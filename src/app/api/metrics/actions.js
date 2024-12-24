import { cookies } from 'next/headers'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' // Use env

export async function getUsersByMonth(year, status) {
  console.log('year and status inside action:', year, status)
  const authToken = cookies().get('authToken')?.value
  const res = await fetch(`${baseUrl}/api/metrics/?year=${year}&status=${status}`, {
    cache: 'no-store', // Ensures fresh data every time
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  const data = await res.json()
  console.log('data inside action metrics:', data)

  return data
  // const joinedByMonth = Array(12).fill(0)

  // let totalEmployeesJoined = 0
  // const totalEmployees = users.length
  // users.forEach((user) => {
  //   if (user.DateHired) {
  //     const hireDate = new Date(user.DateHired)
  //     const hireYear = hireDate.getFullYear()
  //     if (hireYear === year) {
  //       const hireMonth = hireDate.getMonth() // getMonth() returns 0 for Jan, 11 for Dec
  //       joinedByMonth[hireMonth] += 1
  //       totalEmployeesJoined += 1
  //     }
  //   }
  // })

  // const result = {
  //   totalEmployees,
  //   totalEmployeesJoined,
  //   monthlyData: joinedByMonth,
  // }
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

  console.log('data inside action getDeparmentInfo:', data)
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
  console.log('users in deparment inside action:', data)
  return data
}
