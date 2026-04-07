import { Divider } from '@/components/ui/divider'

function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded bg-zinc-200 dark:bg-zinc-700 ${className}`} />
}

function DescriptionRowSkeleton() {
  return (
    <div className="flex items-center justify-between py-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-48" />
    </div>
  )
}

export default function UserDetailLoading() {
  return (
    <>
      <Skeleton className="h-4 w-20" />
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20 rounded-lg" />
          <Skeleton className="h-9 w-28 rounded-lg" />
        </div>
      </div>
      <div className="mt-4 flex gap-6">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-36" />
      </div>
      <Divider className="my-10 mt-6" />
      <Skeleton className="h-6 w-40" />
      <div className="mt-4 space-y-1">
        <DescriptionRowSkeleton />
        <Divider soft />
        <DescriptionRowSkeleton />
        <Divider soft />
        <DescriptionRowSkeleton />
        <Divider soft />
        <DescriptionRowSkeleton />
      </div>
      <Divider className="my-10" />
      <Skeleton className="h-6 w-24" />
      <Skeleton className="mt-4 h-64 w-full rounded-lg" />
    </>
  )
}
