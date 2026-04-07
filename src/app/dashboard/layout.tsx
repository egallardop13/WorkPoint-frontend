import { getEvents } from '@/data'
import type { Metadata } from 'next'

import { ApplicationLayout } from './application-layout'

export const metadata: Metadata = {
  title: {
    template: '%s - WorkPoint',
    default: 'WorkPoint',
  },
  description: '',
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  let events = await getEvents()

  return <ApplicationLayout events={events}>{children}</ApplicationLayout>
}
