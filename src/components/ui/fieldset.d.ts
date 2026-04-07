import * as React from 'react'

interface FieldsetProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
  children?: React.ReactNode
  [key: string]: any
}

export function Fieldset(props: FieldsetProps): React.JSX.Element
export function Legend(props: FieldsetProps): React.JSX.Element
export function FieldGroup(props: FieldsetProps): React.JSX.Element
export function Field(props: FieldsetProps): React.JSX.Element
export function Label(props: FieldsetProps): React.JSX.Element
export function Description(props: FieldsetProps): React.JSX.Element
export function ErrorMessage(props: FieldsetProps): React.JSX.Element
