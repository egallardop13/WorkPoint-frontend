declare module '@/components/ui/link' {
  import { ComponentPropsWithRef } from 'react'
  import { LinkProps } from 'next/link'

  type LinkComponentProps = LinkProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children?: React.ReactNode
    className?: string
  }

  export const Link: React.ForwardRefExoticComponent<LinkComponentProps & React.RefAttributes<HTMLAnchorElement>>
}

declare module '@/components/ui/button' {
  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: string
    outline?: boolean
    plain?: boolean
    href?: string
    children?: React.ReactNode
    className?: string
    [key: string]: any
  }

  export const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>
  export function TouchTarget({ children }: { children: React.ReactNode }): React.JSX.Element
}

declare module '@/components/ui/heading' {
  interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    level?: number
    className?: string
    children?: React.ReactNode
  }

  export function Heading(props: HeadingProps): React.JSX.Element
  export function Subheading(props: HeadingProps): React.JSX.Element
}

declare module '@/components/ui/badge' {
  interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    color?: string
    className?: string
    children?: React.ReactNode
  }

  export function Badge(props: BadgeProps): React.JSX.Element
  export const BadgeButton: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLElement>>
}

declare module '@/components/ui/divider' {
  interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
    soft?: boolean
    className?: string
  }

  export function Divider(props: DividerProps): React.JSX.Element
}

declare module '@/components/ui/text' {
  interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    className?: string
    children?: React.ReactNode
  }

  export function Text(props: TextProps): React.JSX.Element
  export function TextLink(props: TextProps & { href?: string }): React.JSX.Element
  export function Strong(props: TextProps): React.JSX.Element
  export function Code(props: TextProps): React.JSX.Element
}

declare module '@/components/ui/description-list' {
  interface DLProps extends React.HTMLAttributes<HTMLElement> {
    className?: string
    children?: React.ReactNode
  }

  export function DescriptionList(props: DLProps): React.JSX.Element
  export function DescriptionTerm(props: DLProps): React.JSX.Element
  export function DescriptionDetails(props: DLProps): React.JSX.Element
}

declare module '@/components/ui/table' {
  interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
    bleed?: boolean
    dense?: boolean
    grid?: boolean
    striped?: boolean
    className?: string
    children?: React.ReactNode
  }

  interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    href?: string
    target?: string
    title?: string
    className?: string
    children?: React.ReactNode
  }

  interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    className?: string
    children?: React.ReactNode
  }

  interface TableHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
    className?: string
    children?: React.ReactNode
  }

  export function Table(props: TableProps): React.JSX.Element
  export function TableHead(props: React.HTMLAttributes<HTMLTableSectionElement>): React.JSX.Element
  export function TableBody(props: React.HTMLAttributes<HTMLTableSectionElement>): React.JSX.Element
  export function TableRow(props: TableRowProps): React.JSX.Element
  export function TableHeader(props: TableHeaderProps): React.JSX.Element
  export function TableCell(props: TableCellProps): React.JSX.Element
}

declare module '@/components/ui/select' {
  interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    className?: string
    children?: React.ReactNode
  }

  export const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>
}

declare module '@/components/ui/input' {
  interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
    [key: string]: any
  }

  export function InputGroup(props: { children: React.ReactNode }): React.JSX.Element
  export const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>
}

declare module '@/components/ui/fieldset' {
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
}

declare module '@/components/ui/dropdown' {
  interface DropdownProps {
    children?: React.ReactNode
    [key: string]: any
  }

  export function Dropdown(props: DropdownProps): React.JSX.Element
  export function DropdownButton(props: DropdownProps): React.JSX.Element
  export function DropdownMenu(props: DropdownProps & { anchor?: string; className?: string }): React.JSX.Element
  export function DropdownItem(props: DropdownProps & { href?: string; className?: string }): React.JSX.Element
  export function DropdownHeader(props: DropdownProps): React.JSX.Element
  export function DropdownSection(props: DropdownProps): React.JSX.Element
  export function DropdownHeading(props: DropdownProps): React.JSX.Element
  export function DropdownDivider(props: DropdownProps): React.JSX.Element
  export function DropdownLabel(props: DropdownProps): React.JSX.Element
  export function DropdownDescription(props: DropdownProps): React.JSX.Element
  export function DropdownShortcut(props: DropdownProps & { keys: string }): React.JSX.Element
}

declare module '@/components/ui/avatar' {
  interface AvatarProps extends React.HTMLAttributes<HTMLElement> {
    src?: string | null
    square?: boolean
    initials?: string
    alt?: string
    className?: string
    [key: string]: any
  }

  export function Avatar(props: AvatarProps): React.JSX.Element
  export const AvatarButton: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLElement>>
}

declare module '@/components/ui/checkbox' {
  interface CheckboxProps {
    color?: string
    className?: string
    name?: string
    children?: React.ReactNode
    [key: string]: any
  }

  export function CheckboxGroup(props: CheckboxProps): React.JSX.Element
  export function CheckboxField(props: CheckboxProps): React.JSX.Element
  export function Checkbox(props: CheckboxProps): React.JSX.Element
}

declare module '@/components/ui/dialog' {
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
}
