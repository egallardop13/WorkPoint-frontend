import * as React from 'react'

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string
  children?: React.ReactNode
}

export function Text(props: TextProps): React.JSX.Element
export function TextLink(props: TextProps & { href?: string }): React.JSX.Element
export function Strong(props: TextProps): React.JSX.Element
export function Code(props: TextProps): React.JSX.Element
