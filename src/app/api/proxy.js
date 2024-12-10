export default async function handler(req, res) {
  try {
    const response = await fetch('https://workpointbackend.azurewebsites.net/Post/Posts/0/0/none', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDAxIiwibmJmIjoxNzMzNzc3NTYxLCJleHAiOjE3MzM4NjM5NjEsImlhdCI6MTczMzc3NzU2MX0.RBGmLr-6r7M8Wfvl3R6pfD2JCpJ6sRKVOAwJjiYDNolW1IAI7yV8_mh_mMCBiysXQVBGCaseyjwXmEj04BDzCg`,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data // Return data from the API
  } catch (error) {
    console.error('Error fetching users:', error.message)
    throw error // Re-throw the error to be handled by the caller
  }
}
