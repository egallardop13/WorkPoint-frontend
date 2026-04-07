import * as React from 'react'

interface ListboxProps {
  className?: string
  placeholder?: string
  autoFocus?: boolean
  'aria-label'?: string
  children?: React.ReactNode
  name?: string
  value?: any
  onChange?: (value: any) => void
  [key: string]: any
}

interface ListboxOptionProps {
  className?: string
  children?: React.ReactNode
  value?: any
  [key: string]: any
}

export function Listbox(props: ListboxProps): React.JSX.Element
export function ListboxOption(props: ListboxOptionProps): React.JSX.Element
export function ListboxLabel(props: { className?: string; children?: React.ReactNode }): React.JSX.Element
export function ListboxDescription(props: { className?: string; children?: React.ReactNode }): React.JSX.Element
