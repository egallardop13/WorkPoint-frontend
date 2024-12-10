// // app/api/users/route.js

// import { getUsersFullDetails } from '@/lib/mockApi.js/mockApi'
// import { NextResponse } from 'next/server'

// export async function GET(req) {
//   const { searchParams } = new URL(req.url)
//   const page = parseInt(searchParams.get('page') || '1', 10)
//   const limit = parseInt(searchParams.get('limit') || '10', 10)
//   const query = searchParams.get('query') || '' // Get the query from search params

//   // Pass the query to `getUsersFullDetails` for filtering
//   const paginatedData = await getUsersFullDetails(page, limit, query)

//   return NextResponse.json(paginatedData)
// }
// app/api/users/route.js

import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const query = searchParams.get('query') || '' // Get the query from search params

    // Pass the query to `getUsersFullDetails` for filtering
    // const paginatedData = await getUsersFullDetails(page, limit, query)
    const response = await fetch(
      `https://workpointbackend.azurewebsites.net/UserComplete/GetUsersWithPagination/0/false/${page}/${limit}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDAxIiwibmJmIjoxNzMzODcxNzcyLCJleHAiOjE3MzM5NTgxNzEsImlhdCI6MTczMzg3MTc3Mn0.qxUMQiVqO6MZI54y2W-LxbIv6cb3LfXC7jErAq656m3UmXKOhMOzNSu8Pa4al4fLk43v73FVYQZrWO5_5pDZig`,
        },
      }
    )

    // console.log('Printing out response: ', response)

    // Check if the response is okay
    if (!response.ok) {
      console.error('Error fetching data:', response.status, response.statusText)
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    // Parse the JSON response
    const paginatedData = await response.json()
    console.log('Printing out paginatedData: ', paginatedData)
    // await async function handler(req, res) {
    //   try {
    //     const response = await fetch('https://workpointbackend.azurewebsites.net/Post/Posts/0/0/none', {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDAxIiwibmJmIjoxNzMzNzc3NTYxLCJleHAiOjE3MzM4NjM5NjEsImlhdCI6MTczMzc3NzU2MX0.RBGmLr-6r7M8Wfvl3R6pfD2JCpJ6sRKVOAwJjiYDNolW1IAI7yV8_mh_mMCBiysXQVBGCaseyjwXmEj04BDzCg`,
    //       },
    //     })

    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`)
    //     }

    //     const data = await response.json()
    //     return data // Return data from the API
    //   } catch (error) {
    //     console.error('Error fetching users:', error.message)
    //     throw error // Re-throw the error to be handled by the caller
    //   }
    // }
    return NextResponse.json(paginatedData)
  } catch (error) {
    console.error('Error in GET function:', error.message)
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 })
  }
}
