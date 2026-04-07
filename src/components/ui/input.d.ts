import * as React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  [key: string]: any
}

export function InputGroup(props: { children: React.ReactNode }): React.JSX.Element
export function Input(props: InputProps & { ref?: React.Ref<HTMLInputElement> }): React.JSX.Element
