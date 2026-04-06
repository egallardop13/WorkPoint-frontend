import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'

export default function DashboardNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Heading>404 — Page not found</Heading>
      <Text className="mt-2 max-w-md text-center">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </Text>
      <Button href="/dashboard" className="mt-8">
        Back to Dashboard
      </Button>
    </div>
  )
}
