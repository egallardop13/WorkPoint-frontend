'use server'
import { backendFetch } from '@/lib/api'
import type { CompanyInfo } from '@/types'

export async function fetchCompanyInfo(): Promise<CompanyInfo> {
  const res = await backendFetch('company/getcompanyinfo/')
  return res.json()
}
