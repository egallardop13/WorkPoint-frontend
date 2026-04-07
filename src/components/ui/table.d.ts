import * as React from 'react'

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
