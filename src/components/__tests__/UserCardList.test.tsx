import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { UserPascalCase } from '@/types/api'
import UserCardList from '../UserCardList'

const mockUsers: UserPascalCase[] = [
  {
    UserId: 1,
    FirstName: 'John',
    LastName: 'Doe',
    Email: 'john@example.com',
    JobTitle: 'Engineer',
    Department: 'Engineering',
    Gender: 'Male',
    Salary: 80000,
    Active: true,
  },
  {
    UserId: 2,
    FirstName: 'Jane',
    LastName: 'Smith',
    Email: 'jane@example.com',
    JobTitle: 'Designer',
    Department: 'Marketing',
    Gender: 'Female',
    Salary: 75000,
    Active: false,
  },
]

describe('UserCardList', () => {
  it('renders user names and job titles', () => {
    render(<UserCardList users={mockUsers} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('Engineer')).toBeInTheDocument()
    expect(screen.getByText('Designer')).toBeInTheDocument()
  })

  it('shows correct Active/Inactive badges', () => {
    render(<UserCardList users={mockUsers} />)

    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Inactive')).toBeInTheDocument()
  })

  it('renders links to user detail pages', () => {
    render(<UserCardList users={mockUsers} />)

    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '/dashboard/users/1')
    expect(links[1]).toHaveAttribute('href', '/dashboard/users/2')
  })
})
