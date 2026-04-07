import * as React from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string
  children?: React.ReactNode
}

export function Select(props: SelectProps & { ref?: React.Ref<HTMLSelectElement> }): React.JSX.Element
