import * as React from 'react'

interface NavbarProps {
  className?: string
  children?: React.ReactNode
  [key: string]: any
}

export function Navbar(props: NavbarProps): React.JSX.Element
export function NavbarDivider(props: NavbarProps): React.JSX.Element
export function NavbarSection(props: NavbarProps): React.JSX.Element
export function NavbarSpacer(props: NavbarProps): React.JSX.Element
export function NavbarItem(props: NavbarProps & { ref?: React.Ref<HTMLElement> }): React.JSX.Element
export function NavbarLabel(props: NavbarProps): React.JSX.Element
