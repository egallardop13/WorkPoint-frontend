import { NextResponse } from 'next/server'
const backEndUrl = process.env.NEXT_BACKEND_URL

export async function PUT(req) {
  const authToken = req.headers.get('Authorization')

  if (!authToken) {
    return NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 })
  }

  try {
    const user = await req.json()
    if (user.active === 'true') {
      user.active = true
    } else if (user.active === 'false') {
      user.active = false
    }

    console.log('upsert in UpsertUser route:', user)

    const response = await fetch(`${backEndUrl}/UserComplete/UpsertUser/`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
      body: JSON.stringify({ ...user }),
    })

    if (!response.ok) {
      console.error('Error fetching data:', response.status, response.statusText)
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const upsertResult = await response.json()
    console.log('upsertResult in UpsertUser route:', upsertResult)
    return NextResponse.json(upsertResult)
  } catch (error) {
    console.error('Error in PUT function:', error.message)
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 })
  }
}
