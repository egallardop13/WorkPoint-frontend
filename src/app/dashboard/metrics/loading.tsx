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

function ChartSkeleton() {
  return <Skeleton className="h-64 w-full rounded-lg" />
}

export default function MetricsLoading() {
  return (
    <>
      <Skeleton className="h-8 w-72" />
      <Divider className="my-10 mt-6" />
      <Skeleton className="h-6 w-56" />
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
      <Divider className="my-10" />
      <Skeleton className="h-6 w-48" />
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    </>
  )
}
