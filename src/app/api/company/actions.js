'use server'
import { backendFetch } from '@/lib/api'

export async function fetchCompanyInfo() {
  const res = await backendFetch('company/getcompanyinfo/')
  return res.json()
}
