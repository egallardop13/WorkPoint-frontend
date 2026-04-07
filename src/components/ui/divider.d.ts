import * as React from 'react'

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  soft?: boolean
  className?: string
}

export function Divider(props: DividerProps): React.JSX.Element
