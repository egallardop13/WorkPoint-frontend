// User types — camelCase (from GetUsers/{id})
export interface User {
  userId: number
  firstName: string
  lastName: string
  email: string
  jobTitle: string
  department: string
  gender: string
  salary: number
  active: boolean
  avgSalary: number
  dateHired: string
  dateExited: string
}

// User types — PascalCase (from GetUsersWithPagination)
export interface UserPascalCase {
  UserId: number
  FirstName: string
  LastName: string
  Email: string
  JobTitle: string
  Department: string
  Gender: string
  Salary: number
  Active: boolean
}

// Paginated response from GetUsersWithPagination
export interface PaginatedUsersResponse {
  arrayUserComplete: string // JSON string that parses to UserPascalCase[]
  totalPages: number
}

// Department types
export interface DepartmentInfo {
  department: string
  Department?: string
  employeeCount: number
  activeEmployeeCount: number
  totalSalary: number
  avgSalary: number
  minSalary: number
  maxSalary: number
  totalSalaryPaidToDepartment: number
}

// Users within a department — mixed casing from GetUsersInDepartments
export interface DepartmentUser {
  userId?: number
  UserId?: number
  firstName: string
  lastName: string
  email: string
  JobTitle: string
  salary: number
  active: boolean
  id?: number
}

export interface DepartmentUsersResponse {
  users: DepartmentUser[]
  totalPages: number
  totalActiveSalary: number
  totalInactiveSalary: number
}

// Company types
export interface CompanyInfo {
  totalBudget: number
  totalUsers: number
  totalActiveUsers: number
  totalInactiveUsers: number
}

// Metrics types
export interface MonthlyBreakdown {
  month: string
  count: number
}

export interface MetricsResponse {
  joinedOrLeftYearly: number
  totalEmployees: number
  monthlyBreakdown: MonthlyBreakdown[]
}

export interface BudgetEntry {
  totalBudget: number
  activeBudget: number
  inactiveBudget: number
}

// Auth types
export interface LoginCredentials {
  email: string
  password: string
}

export interface TokenPayload {
  userId: string
  exp?: number
  [key: string]: unknown
}

// Upsert payload
export interface UpsertUserPayload {
  userId?: number
  firstName: string
  lastName: string
  email: string
  jobTitle: string
  department: string
  gender: string
  salary: string | number
  active: boolean | string
}
