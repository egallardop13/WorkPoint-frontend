import { getDepartmentsInfo } from '@/app/api/departments/actions'
import { fetchUser } from '@/app/api/users/actions'
import EditUserForm from '@/components/home/EditUserForm'
import { Link } from '@/components/ui/link'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'

// JobTitle: string;
// Department: string;
// Salary: string | number;
// UserId: number;
// FirstName: string;
// LastName: string;
// Email: string;
// Gender: string;
// Active: string;
// DateHired: string;
// DateExited: string;
const page = async ({ params }) => {
  let data = await fetchUser(params.id)
  // console.log('data sdfwef:', data)
  const user = data[0]

  const departments = await getDepartmentsInfo()

  return (
    <>
      <div className="max-lg:hidden">
        <Link
          href={`/dashboard/users/${params.id}`}
          className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
        >
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Back to Profile
        </Link>
      </div>
      <EditUserForm user={user} departments={departments} />
    </>
  )
}

export default page
