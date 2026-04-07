import { Divider } from '@/components/ui/divider'

function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded bg-zinc-200 dark:bg-zinc-700 ${className}`} />
}

function DepartmentItemSkeleton() {
  return (
    <li className="flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <div>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="mt-2 h-3 w-48" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
    </li>
  )
}

export default function DepartmentsLoading() {
  return (
    <>
      <Skeleton className="h-8 w-48" />
      <div className="mt-4 flex max-w-xl gap-4">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-32" />
      </div>
      <Divider className="my-6" />
      <ul className="space-y-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <DepartmentItemSkeleton key={i} />
        ))}
      </ul>
    </>
  )
}
