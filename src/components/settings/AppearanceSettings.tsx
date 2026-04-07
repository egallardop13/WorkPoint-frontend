'use client'

import { Description, Label } from '@/components/ui/fieldset'
import { Switch, SwitchField } from '@/components/ui/switch'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function AppearanceSettings() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="h-10 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
    )
  }

  return (
    <SwitchField className="">
      <Label>Dark mode</Label>
      <Description>Switch between light and dark theme</Description>
      <Switch
        className=""
        color="dark/zinc"
        checked={resolvedTheme === 'dark'}
        onChange={(checked: boolean) => setTheme(checked ? 'dark' : 'light')}
      />
    </SwitchField>
  )
}
