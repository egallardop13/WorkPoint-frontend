'use client'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-zinc-900">
      <ExclamationTriangleIcon className="size-16 text-red-400 dark:text-red-500" />
      <Heading className="mt-6">Something went wrong</Heading>
      <Text className="mt-2 max-w-md text-center">
        {error?.message || 'An unexpected error occurred.'}
      </Text>
      <div className="mt-8 flex gap-4">
        <Button onClick={reset}>Try again</Button>
        <Button href="/" plain>
          Go home
        </Button>
      </div>
    </div>
  )
}
