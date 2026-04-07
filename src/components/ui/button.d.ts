import * as React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string
  outline?: boolean
  plain?: boolean
  href?: string
  children?: React.ReactNode
  className?: string
  [key: string]: any
}

export function Button(props: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }): React.JSX.Element
export function TouchTarget({ children }: { children: React.ReactNode }): React.JSX.Element
