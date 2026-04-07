import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams('page=1'),
  usePathname: () => '/dashboard',
}))

import Pagination from '../Pagination'

describe('Pagination', () => {
  it('renders Previous and Next links', () => {
    render(<Pagination totalPages={5} />)

    expect(screen.getByText('Previous')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })

  it('disables Previous link on first page', () => {
    render(<Pagination totalPages={5} />)

    const prevLink = screen.getByText('Previous').closest('a')
    expect(prevLink?.className).toContain('pointer-events-none')
  })

  it('does not disable Next link when not on last page', () => {
    render(<Pagination totalPages={5} />)

    const nextLink = screen.getByText('Next').closest('a')
    expect(nextLink?.className).not.toContain('pointer-events-none')
  })

  it('does not disable Previous when totalPages is 1 and page is 1 but still renders', () => {
    render(<Pagination totalPages={1} />)

    const prevLink = screen.getByText('Previous').closest('a')
    expect(prevLink?.className).toContain('pointer-events-none')

    const nextLink = screen.getByText('Next').closest('a')
    expect(nextLink?.className).toContain('pointer-events-none')
  })
})
