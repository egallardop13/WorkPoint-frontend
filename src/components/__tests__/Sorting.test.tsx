import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockReplace = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace, push: vi.fn(), back: vi.fn(), refresh: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/dashboard/departments',
}))

import Sorting from '../Sorting'

describe('Sorting', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders options for departments variant', () => {
    render(<Sorting values={['name', 'budget ↓', 'budget ↑']} variant="departments" />)

    expect(screen.getByText('Sort by name')).toBeInTheDocument()
    expect(screen.getByText('Sort by budget ↓')).toBeInTheDocument()
    expect(screen.getByText('Sort by budget ↑')).toBeInTheDocument()
  })

  it('renders options for default variant', () => {
    render(<Sorting values={['name', 'department', 'active']} variant="home" />)

    expect(screen.getByText('Sort by name')).toBeInTheDocument()
    expect(screen.getByText('Sort by department')).toBeInTheDocument()
    expect(screen.getByText('Sort by active')).toBeInTheDocument()
  })

  it('maps budget ↓ to budgetDesc value for departments variant', () => {
    render(<Sorting values={['name', 'budget ↓', 'budget ↑']} variant="departments" />)

    const budgetDescOption = screen.getByText('Sort by budget ↓') as HTMLOptionElement
    expect(budgetDescOption.value).toBe('budgetDesc')
  })

  it('renders options and maps salary values for departmentEmployees variant', () => {
    render(<Sorting values={['name', 'salary ↓', 'salary ↑', 'active']} variant="departmentEmployees" />)

    expect(screen.getByText('Sort by name')).toBeInTheDocument()
    expect(screen.getByText('Sort by salary ↓')).toBeInTheDocument()
    const salaryDescOption = screen.getByText('Sort by salary ↓') as HTMLOptionElement
    expect(salaryDescOption.value).toBe('salaryDesc')
    const salaryAscOption = screen.getByText('Sort by salary ↑') as HTMLOptionElement
    expect(salaryAscOption.value).toBe('salaryAsc')
  })

  it('calls replace with sort param on change', async () => {
    const user = userEvent.setup()
    render(<Sorting values={['name', 'department']} variant="home" />)

    await user.selectOptions(screen.getByRole('combobox'), 'department')

    expect(mockReplace).toHaveBeenCalledWith(
      expect.stringContaining('sort=department')
    )
  })
})
