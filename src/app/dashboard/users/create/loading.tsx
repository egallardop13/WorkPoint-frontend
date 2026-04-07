import { Divider } from '@/components/ui/divider'

function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded bg-zinc-200 dark:bg-zinc-700 ${className}`} />
}

function FieldSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}

export default function CreateUserLoading() {
  return (
    <>
      <Skeleton className="h-4 w-16" />
      <Skeleton className="mt-4 h-8 w-48" />
      <Divider className="my-6" />
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <FieldSkeleton />
          <FieldSkeleton />
        </div>
        <FieldSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />
        <div className="flex justify-end pt-4">
          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>
      </div>
    </>
  )
}
