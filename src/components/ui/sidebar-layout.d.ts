import * as React from 'react'

interface SidebarLayoutProps {
  navbar: React.ReactNode
  sidebar: React.ReactNode
  children?: React.ReactNode
}

export function SidebarLayout(props: SidebarLayoutProps): React.JSX.Element
