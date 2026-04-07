import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { DepartmentUser } from '@/types/api'
import DepartmentUserCardList from '../DepartmentUserCardList'

const mockUsers: DepartmentUser[] = [
  {
    UserId: 10,
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    JobTitle: 'Manager',
    salary: 95000,
    active: true,
  },
  {
    userId: 20,
    firstName: 'Bob',
    lastName: 'Brown',
    email: 'bob@example.com',
    JobTitle: 'Analyst',
    salary: 65000,
    active: false,
  },
]

describe('DepartmentUserCardList', () => {
  it('renders user names, job titles, and formatted salaries', () => {
    render(<DepartmentUserCardList users={mockUsers} />)

    expect(screen.getByText('Alice Johnson')).toBeInTheDocument()
    expect(screen.getByText('Bob Brown')).toBeInTheDocument()
    expect(screen.getByText('Manager')).toBeInTheDocument()
    expect(screen.getByText('Analyst')).toBeInTheDocument()
    expect(screen.getByText('$95,000.00')).toBeInTheDocument()
    expect(screen.getByText('$65,000.00')).toBeInTheDocument()
  })

  it('shows correct Active/Inactive badges', () => {
    render(<DepartmentUserCardList users={mockUsers} />)

    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Inactive')).toBeInTheDocument()
  })

  it('handles mixed casing of user IDs', () => {
    render(<DepartmentUserCardList users={mockUsers} />)

    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '/dashboard/users/10')
    expect(links[1]).toHaveAttribute('href', '/dashboard/users/20')
  })
})
