'use server'
import { backendFetch } from '@/lib/api'
import type { BudgetEntry, MetricsResponse } from '@/types'

export async function getUsersByMonth(year: number, status: boolean): Promise<MetricsResponse> {
  const res = await backendFetch(`Company/GetMetrics/${year}/${status}`)
  return res.json()
}

export async function getCompanyBudget(year: number): Promise<BudgetEntry[]> {
  const res = await backendFetch(`Company/GetBudget/${year}`)
  return res.json()
}
