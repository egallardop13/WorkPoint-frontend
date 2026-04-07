import * as React from 'react'
import { LinkProps } from 'next/link'

type LinkComponentProps = LinkProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
  children?: React.ReactNode
  className?: string
}

export function Link(props: LinkComponentProps & { ref?: React.Ref<HTMLAnchorElement> }): React.JSX.Element
