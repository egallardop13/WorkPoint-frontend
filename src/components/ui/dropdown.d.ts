import * as React from 'react'

interface DropdownProps {
  children?: React.ReactNode
  [key: string]: any
}

export function Dropdown(props: DropdownProps): React.JSX.Element
export function DropdownButton(props: DropdownProps): React.JSX.Element
export function DropdownMenu(props: DropdownProps & { anchor?: string; className?: string }): React.JSX.Element
export function DropdownItem(props: DropdownProps & { href?: string; className?: string }): React.JSX.Element
export function DropdownHeader(props: DropdownProps): React.JSX.Element
export function DropdownSection(props: DropdownProps): React.JSX.Element
export function DropdownHeading(props: DropdownProps): React.JSX.Element
export function DropdownDivider(props: DropdownProps): React.JSX.Element
export function DropdownLabel(props: DropdownProps): React.JSX.Element
export function DropdownDescription(props: DropdownProps): React.JSX.Element
export function DropdownShortcut(props: DropdownProps & { keys: string }): React.JSX.Element
