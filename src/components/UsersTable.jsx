import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from './ui/badge'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' // Use env
// async function fetchUsers(page = 1, limit = 10) {
//   const res = await fetch(`${baseUrl}/api/users?page=${page}&limit=${limit}`, {
//     cache: 'no-store', // Ensures fresh data every time
//   })
//   const data = await res.json()
//   console.log('data:', data)
//   return data
// }

async function fetchUsers(page = 1, limit = 10, query = '') {
  const res = await fetch(`${baseUrl}/api/users?page=${page}&limit=${limit}&query=${query}`, {
    cache: 'no-store', // Ensures fresh data every time
  })
  const data = await res.json()
  console.log('datafetch:', data)
  return data
}
const UsersTable = async ({ users }) => {
  // const users = await fetchUsers(page, 10, query)

  return (
    <div className="">
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Job Title</TableHeader>
            <TableHeader>Department</TableHeader>
            <TableHeader className={'text-left'}>Active</TableHeader>
            {/* <TableHeader>Amount</TableHeader> */}
            {/* <TableHeader>Amount</TableHeader> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userId} href={`/users/${user.userId}`} title={`user #${user.userId}`}>
              <TableCell>{user.firstName + ' ' + user.lastName}</TableCell>
              <TableCell className="text-zinc-500">{user.email}</TableCell>
              <TableCell>{user.jobTitle}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{user.department}</span>
                </div>
              </TableCell>
              <TableCell className={'text-left'}>
                <Badge color={user.active === true ? 'lime' : 'pink'}>{user.active ? 'Active' : 'Inactive'}</Badge>
              </TableCell>
              {/* <TableCell>US{user.amount.usd}</TableCell> */}
              {/* <TableCell>US{user.amount.usd}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default UsersTable
