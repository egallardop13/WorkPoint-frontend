import * as React from 'react'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string
  className?: string
  children?: React.ReactNode
}

export function Badge(props: BadgeProps): React.JSX.Element
export function BadgeButton(props: BadgeProps & { ref?: React.Ref<HTMLElement> }): React.JSX.Element
