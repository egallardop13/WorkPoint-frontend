import * as React from 'react'

interface AvatarProps extends React.HTMLAttributes<HTMLElement> {
  src?: string | null
  square?: boolean
  initials?: string
  alt?: string
  className?: string
  [key: string]: any
}

export function Avatar(props: AvatarProps): React.JSX.Element
export function AvatarButton(props: AvatarProps & { ref?: React.Ref<HTMLElement> }): React.JSX.Element
