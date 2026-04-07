import * as React from 'react'

interface DialogProps {
  size?: string
  className?: string
  children?: React.ReactNode
  open?: boolean
  onClose?: (value: boolean) => void
  [key: string]: any
}

export function Dialog(props: DialogProps): React.JSX.Element
export function DialogTitle(props: DialogProps): React.JSX.Element
export function DialogDescription(props: DialogProps): React.JSX.Element
export function DialogBody(props: DialogProps): React.JSX.Element
export function DialogActions(props: DialogProps): React.JSX.Element
