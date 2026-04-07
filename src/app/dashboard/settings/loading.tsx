import { Divider } from '@/components/ui/divider'

function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded bg-zinc-200 dark:bg-zinc-700 ${className}`} />
}

function DescriptionRowSkeleton() {
  return (
    <div className="grid grid-cols-[1fr_2fr] gap-4 py-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-40" />
    </div>
  )
}

export default function SettingsLoading() {
  return (
    <div className="mx-auto max-w-4xl">
      <Skeleton className="h-8 w-32" />
      <Divider className="my-6" />

      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-9 w-28 rounded-lg" />
      </div>
      <Divider className="mt-4" />
      {Array.from({ length: 7 }).map((_, i) => (
        <DescriptionRowSkeleton key={i} />
      ))}

      <Skeleton className="mt-12 h-5 w-36" />
      <Divider className="mt-4" />
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="h-4 w-28" />
            <Skeleton className="mt-1 h-8 w-36" />
          </div>
        ))}
      </div>

      <Skeleton className="mt-8 h-5 w-28" />
      <Divider className="mt-4" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between py-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}

      <Skeleton className="mt-12 h-5 w-24" />
      <Divider className="mt-4" />
      <Skeleton className="mt-6 h-10 w-48" />
    </div>
  )
}
