'use client'

import { Button } from '@/components/ui/button'
import { Heading, Subheading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function DashboardError({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <ExclamationTriangleIcon className="size-16 text-red-400 dark:text-red-500" />
      <Heading className="mt-6">Something went wrong</Heading>
      <Text className="mt-2 max-w-md text-center">
        {error?.message || 'An unexpected error occurred while loading the dashboard.'}
      </Text>
      <div className="mt-8 flex gap-4">
        <Button onClick={reset}>Try again</Button>
        <Button href="/dashboard" plain>
          Go home
        </Button>
      </div>
    </div>
  )
}
