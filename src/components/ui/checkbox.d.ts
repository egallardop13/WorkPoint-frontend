import * as React from 'react'

interface CheckboxProps {
  color?: string
  className?: string
  name?: string
  children?: React.ReactNode
  [key: string]: any
}

export function CheckboxGroup(props: CheckboxProps): React.JSX.Element
export function CheckboxField(props: CheckboxProps): React.JSX.Element
export function Checkbox(props: CheckboxProps): React.JSX.Element
