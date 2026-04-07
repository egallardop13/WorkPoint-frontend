import { describe, expect, it, vi, beforeEach } from 'vitest'
import { renderWithProviders, userEvent, screen, waitFor } from '@/test/test-utils'
import CreateUserForm from '@/components/home/users/CreateUserForm'
import type { DepartmentInfo } from '@/types'

const mockPush = vi.fn()
const mockMutateAsync = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    back: vi.fn(),
    refresh: vi.fn(),
  }),
  useParams: () => ({}),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}))

vi.mock('@/lib/mutations', () => ({
  useUpsertUser: () => ({
    mutateAsync: mockMutateAsync,
  }),
}))

vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

vi.mock('@/app/dashboard/settings/departmentListBox', () => ({
  DepartmentListBox: ({
    onChange,
    value,
    departments,
  }: {
    onChange: (val: string) => void
    value: string
    departments: DepartmentInfo[]
  }) => (
    <select
      aria-label="Department"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {departments?.map((d) => (
        <option key={d.department ?? d.Department} value={d.department ?? d.Department}>
          {d.department ?? d.Department}
        </option>
      ))}
    </select>
  ),
}))

const mockDepartments: DepartmentInfo[] = [
  {
    department: 'Engineering',
    Department: 'Engineering',
    employeeCount: 10,
    activeEmployeeCount: 8,
    totalSalary: 800000,
    avgSalary: 80000,
    minSalary: 60000,
    maxSalary: 120000,
    totalSalaryPaidToDepartment: 800000,
  },
  {
    department: 'Sales',
    Department: 'Sales',
    employeeCount: 5,
    activeEmployeeCount: 4,
    totalSalary: 400000,
    avgSalary: 80000,
    minSalary: 50000,
    maxSalary: 100000,
    totalSalaryPaidToDepartment: 400000,
  },
]

beforeEach(() => {
  mockPush.mockReset()
  mockMutateAsync.mockReset()
})

describe('CreateUserForm', () => {
  it('renders all form fields', () => {
    renderWithProviders(<CreateUserForm departments={mockDepartments} />)

    expect(screen.getByLabelText(/employee first name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/employee last name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/employee gender/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/job title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/department/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/employee email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/employee salary/i)).toBeInTheDocument()
  })

  it('shows validation errors on empty submit', async () => {
    renderWithProviders(<CreateUserForm departments={mockDepartments} />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /add/i }))

    await waitFor(() => {
      expect(screen.getByText('Please enter a first name')).toBeInTheDocument()
      expect(screen.getByText('Please enter a last name')).toBeInTheDocument()
    })
  })

  it('submits successfully and redirects', async () => {
    mockMutateAsync.mockResolvedValue({ status: 200 })
    renderWithProviders(<CreateUserForm departments={mockDepartments} />)
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/employee first name/i), 'John')
    await user.type(screen.getByLabelText(/employee last name/i), 'Doe')
    await user.type(screen.getByLabelText(/employee gender/i), 'Male')
    await user.type(screen.getByLabelText(/job title/i), 'Engineer')
    await user.type(screen.getByLabelText(/employee email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/employee salary/i), '85000')
    await user.click(screen.getByRole('button', { name: /add/i }))

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalled()
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('shows error toast on server failure', async () => {
    mockMutateAsync.mockRejectedValue(new Error('Server error'))
    renderWithProviders(<CreateUserForm departments={mockDepartments} />)
    const user = userEvent.setup()
    const toast = (await import('react-hot-toast')).default

    await user.type(screen.getByLabelText(/employee first name/i), 'John')
    await user.type(screen.getByLabelText(/employee last name/i), 'Doe')
    await user.type(screen.getByLabelText(/employee gender/i), 'Male')
    await user.type(screen.getByLabelText(/job title/i), 'Engineer')
    await user.type(screen.getByLabelText(/employee email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/employee salary/i), '85000')
    await user.click(screen.getByRole('button', { name: /add/i }))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Server error')
    })
  })
})
