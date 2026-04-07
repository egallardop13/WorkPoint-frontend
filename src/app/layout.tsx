import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import Providers from './dashboard/providers'

export const metadata: Metadata = {
  title: 'WorkPoint',
  description:
    'WorkPoint is a platform that helps you manage your company in a simple and efficient way. It is designed to help you organize your work and keep track of your progress',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="h-full text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body className="h-full">
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
