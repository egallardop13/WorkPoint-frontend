import { beforeEach, describe, expect, it, vi } from 'vitest'
import { backendFetch } from '@/lib/api'
import { fetchCompanyInfo } from '@/app/api/company/actions'
import { fetchUsersinDepartment, getDepartmentInfo, getDepartmentsInfo } from '@/app/api/departments/actions'
import { getCompanyBudget, getUsersByMonth } from '@/app/api/metrics/actions'
import { fetchUser, fetchUsers } from '@/app/api/users/actions'
import { deleteUser, UpsertUser } from '@/app/api/users/create/actions'

vi.mock('@/lib/api', () => ({
  backendFetch: vi.fn(),
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

const mockBackendFetch = vi.mocked(backendFetch)

function mockResponse(data: unknown, status = 200) {
  return {
    ok: true,
    status,
    json: () => Promise.resolve(data),
  } as unknown as Response
}

beforeEach(() => {
  mockBackendFetch.mockReset()
})

describe('fetchUsers', () => {
  it('calls backendFetch with correct pagination path', async () => {
    const data = { arrayUserComplete: '[]', totalPages: 1 }
    mockBackendFetch.mockResolvedValue(mockResponse(data))

    const result = await fetchUsers(2, 20, 'john', 'name')
    expect(mockBackendFetch).toHaveBeenCalledWith(
      'UserComplete/GetUsersWithPagination/2/20?query=john&sort=name'
    )
    expect(result).toEqual(data)
  })

  it('uses default params when none provided', async () => {
    mockBackendFetch.mockResolvedValue(mockResponse({ arrayUserComplete: '[]', totalPages: 0 }))

    await fetchUsers()
    expect(mockBackendFetch).toHaveBeenCalledWith(
      'UserComplete/GetUsersWithPagination/1/10?query=&sort='
    )
  })
})

describe('fetchUser', () => {
  it('calls backendFetch with correct user path', async () => {
    const users = [{ userId: 1, firstName: 'John' }]
    mockBackendFetch.mockResolvedValue(mockResponse(users))

    const result = await fetchUser('1')
    expect(mockBackendFetch).toHaveBeenCalledWith('/UserComplete/GetUsers/1/false')
    expect(result).toEqual(users)
  })
})

describe('UpsertUser', () => {
  it('converts salary string to number', async () => {
    mockBackendFetch.mockResolvedValue(mockResponse({ id: 1 }))

    await UpsertUser({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      jobTitle: 'Dev',
      department: 'Engineering',
      gender: 'Male',
      salary: '75000',
      active: true,
    })

    const body = JSON.parse(mockBackendFetch.mock.calls[0][1]!.body as string)
    expect(body.salary).toBe(75000)
    expect(typeof body.salary).toBe('number')
  })

  it('converts active "true" string to boolean true', async () => {
    mockBackendFetch.mockResolvedValue(mockResponse({ id: 1 }))

    await UpsertUser({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      jobTitle: 'Dev',
      department: 'Engineering',
      gender: 'Male',
      salary: '75000',
      active: 'true',
    })

    const body = JSON.parse(mockBackendFetch.mock.calls[0][1]!.body as string)
    expect(body.active).toBe(true)
  })

  it('converts active "false" string to boolean false', async () => {
    mockBackendFetch.mockResolvedValue(mockResponse({ id: 1 }))

    await UpsertUser({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      jobTitle: 'Dev',
      department: 'Engineering',
      gender: 'Male',
      salary: '75000',
      active: 'false',
    })

    const body = JSON.parse(mockBackendFetch.mock.calls[0][1]!.body as string)
    expect(body.active).toBe(false)
  })

  it('calls PUT on the UpsertUser endpoint', async () => {
    mockBackendFetch.mockResolvedValue(mockResponse({ id: 1 }))

    await UpsertUser({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      jobTitle: 'Dev',
      department: 'Engineering',
      gender: 'Male',
      salary: '75000',
      active: true,
    })

    expect(mockBackendFetch).toHaveBeenCalledWith('/UserComplete/UpsertUser/', {
      method: 'PUT',
      body: expect.any(String),
    })
  })

  it('returns data with status code', async () => {
    mockBackendFetch.mockResolvedValue(mockResponse({ id: 1 }, 200))

    const result = await UpsertUser({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      jobTitle: 'Dev',
      department: 'Engineering',
      gender: 'Male',
      salary: '75000',
      active: true,
    })

    expect(result).toEqual({ id: 1, status: 200 })
  })
})

describe('deleteUser', () => {
  it('calls DELETE with correct userId path', async () => {
    mockBackendFetch.mockResolvedValue(mockResponse('User deleted'))

    const result = await deleteUser(42)
    expect(mockBackendFetch).toHaveBeenCalledWith('/UserComplete/DeleteUser/42', {
      method: 'DELETE',
    })
    expect(result).toEqual({ status: 200, message: 'User deleted' })
  })
})

describe('fetchCompanyInfo', () => {
  it('calls the correct endpoint and returns CompanyInfo', async () => {
    const info = { totalBudget: 1000000, totalUsers: 50, totalActiveUsers: 40, totalInactiveUsers: 10 }
    mockBackendFetch.mockResolvedValue(mockResponse(info))

    const result = await fetchCompanyInfo()
    expect(mockBackendFetch).toHaveBeenCalledWith('company/getcompanyinfo/')
    expect(result).toEqual(info)
  })
})

describe('getDepartmentsInfo', () => {
  it('returns all departments info', async () => {
    const departments = [{ department: 'Engineering', employeeCount: 10 }]
    mockBackendFetch.mockResolvedValue(mockResponse(departments))

    const result = await getDepartmentsInfo()
    expect(mockBackendFetch).toHaveBeenCalledWith('UserSalary/GetDepartmentsInfo/')
    expect(result).toEqual(departments)
  })
})

describe('getDepartmentInfo', () => {
  it('calls with department name', async () => {
    const dept = [{ department: 'Sales', employeeCount: 5 }]
    mockBackendFetch.mockResolvedValue(mockResponse(dept))

    const result = await getDepartmentInfo('Sales')
    expect(mockBackendFetch).toHaveBeenCalledWith('UserSalary/GetDepartmentsInfo/Sales')
    expect(result).toEqual(dept)
  })
})

describe('fetchUsersinDepartment', () => {
  it('passes query and sort as query string params', async () => {
    const data = { users: [], totalPages: 1, totalActiveSalary: 0, totalInactiveSalary: 0 }
    mockBackendFetch.mockResolvedValue(mockResponse(data))

    const result = await fetchUsersinDepartment('Engineering', 2, 10, 'john', 'salaryDesc')
    expect(mockBackendFetch).toHaveBeenCalledWith(
      '/UserJobInfo/GetUsersInDepartments/Engineering/2/10?query=john&sort=salaryDesc'
    )
    expect(result).toEqual(data)
  })

  it('uses default empty query and sort', async () => {
    const data = { users: [], totalPages: 0, totalActiveSalary: 0, totalInactiveSalary: 0 }
    mockBackendFetch.mockResolvedValue(mockResponse(data))

    await fetchUsersinDepartment('Sales')
    expect(mockBackendFetch).toHaveBeenCalledWith(
      '/UserJobInfo/GetUsersInDepartments/Sales/1/10?query=&sort='
    )
  })
})

describe('getUsersByMonth', () => {
  it('calls with year and status params', async () => {
    const metrics = { joinedOrLeftYearly: 10, totalEmployees: 50, monthlyBreakdown: [] }
    mockBackendFetch.mockResolvedValue(mockResponse(metrics))

    const result = await getUsersByMonth(2024, true)
    expect(mockBackendFetch).toHaveBeenCalledWith('Company/GetMetrics/2024/true')
    expect(result).toEqual(metrics)
  })
})

describe('getCompanyBudget', () => {
  it('calls with year parameter', async () => {
    const budget = [{ totalBudget: 500000, activeBudget: 400000, inactiveBudget: 100000 }]
    mockBackendFetch.mockResolvedValue(mockResponse(budget))

    const result = await getCompanyBudget(2024)
    expect(mockBackendFetch).toHaveBeenCalledWith('Company/GetBudget/2024')
    expect(result).toEqual(budget)
  })
})
