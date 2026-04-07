import * as React from 'react'

interface SidebarProps {
  className?: string
  children?: React.ReactNode
  [key: string]: any
}

export function Sidebar(props: SidebarProps): React.JSX.Element
export function SidebarHeader(props: SidebarProps): React.JSX.Element
export function SidebarBody(props: SidebarProps): React.JSX.Element
export function SidebarFooter(props: SidebarProps): React.JSX.Element
export function SidebarSection(props: SidebarProps): React.JSX.Element
export function SidebarDivider(props: SidebarProps): React.JSX.Element
export function SidebarSpacer(props: SidebarProps): React.JSX.Element
export function SidebarHeading(props: SidebarProps): React.JSX.Element
export function SidebarItem(props: SidebarProps & { href?: string; current?: boolean; hoverPointer?: boolean; ref?: React.Ref<HTMLElement> }): React.JSX.Element
export function SidebarLabel(props: SidebarProps): React.JSX.Element
