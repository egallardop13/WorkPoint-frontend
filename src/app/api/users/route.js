// app/api/users/route.js

import { getUsersFullDetails } from '@/lib/mockApi.js/mockApi'
import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const query = searchParams.get('query') || '' // Get the query from search params

  // Pass the query to `getUsersFullDetails` for filtering
  const paginatedData = await getUsersFullDetails(page, limit, query)

  return NextResponse.json(paginatedData)
}
