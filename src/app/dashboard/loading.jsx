import { Divider } from '@/components/ui/divider'

function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded bg-zinc-200 dark:bg-zinc-700 ${className}`} />
}

function StatSkeleton() {
  return (
    <div>
      <Divider />
      <Skeleton className="mt-6 h-4 w-28" />
      <Skeleton className="mt-3 h-8 w-36" />
      <Skeleton className="mt-3 h-4 w-44" />
    </div>
  )
}

function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 py-3">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="ml-auto h-4 w-16" />
    </div>
  )
}

export default function DashboardLoading() {
  return (
    <>
      <Skeleton className="h-8 w-72" />
      <div className="mt-8 flex items-end justify-between">
        <Skeleton className="h-5 w-24" />
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
      </div>
      <Skeleton className="mt-14 h-5 w-16" />
      <div className="mt-4">
        <Skeleton className="h-10 w-full max-w-xl" />
      </div>
      <div className="mt-6 space-y-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <TableRowSkeleton key={i} />
        ))}
      </div>
    </>
  )
}
