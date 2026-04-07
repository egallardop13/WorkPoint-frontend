import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-zinc-900">
      <Heading>404 — Page not found</Heading>
      <Text className="mt-2 max-w-md text-center">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </Text>
      <Button href="/" className="mt-8">
        Back to Home
      </Button>
    </div>
  )
}
