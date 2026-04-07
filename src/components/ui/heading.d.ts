import * as React from 'react'

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: number
  className?: string
  children?: React.ReactNode
}

export function Heading(props: HeadingProps): React.JSX.Element
export function Subheading(props: HeadingProps): React.JSX.Element
