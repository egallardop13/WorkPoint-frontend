import { Divider } from '@/components/ui/divider'
import { Heading, Subheading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Settings',
}

export default function Settings() {
  return (
    <div className="mx-auto max-w-4xl">
      <Heading>Settings</Heading>
      <Divider className="my-10 mt-6" />
      <div className="flex flex-col items-center justify-center py-20">
        <Cog6ToothIcon className="size-16 text-zinc-300 dark:text-zinc-600" />
        <Subheading className="mt-6">Coming Soon</Subheading>
        <Text className="mt-2 max-w-md text-center">
          Organization settings including company profile, currency preferences, and team configuration are
          currently under development.
        </Text>
      </div>
    </div>
  )
}
