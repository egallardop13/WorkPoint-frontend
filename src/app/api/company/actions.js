'use server'
import { apiFetch } from '@/lib/api'

export async function fetchCompanyInfo() {
  const res = await apiFetch('/api/company/')
  return res.json()
}
