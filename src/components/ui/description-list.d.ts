import * as React from 'react'

interface DLProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
  children?: React.ReactNode
}

export function DescriptionList(props: DLProps): React.JSX.Element
export function DescriptionTerm(props: DLProps): React.JSX.Element
export function DescriptionDetails(props: DLProps): React.JSX.Element
