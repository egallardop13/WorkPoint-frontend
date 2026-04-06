'use server'
import { apiFetch } from '@/lib/api'

export async function getUsersByMonth(year, status) {
  const res = await apiFetch(`/api/metrics/?year=${year}&status=${status}`)
  return res.json()
}

export async function getDepartmentInfo(department) {
  const res = await apiFetch(`/api/departments?department=${department}`)
  return res.json()
}

export async function fetchUsersinDepartment(department, page = 1, limit = 10, query = '') {
  const res = await apiFetch(`/api/departments/${department}/users?page=${page}&limit=${limit}&query=${query}`)
  return res.json()
}

export async function getCompanyBudget(year) {
  const res = await apiFetch(`/api/metrics/company?year=${year}`)
  return res.json()
}
