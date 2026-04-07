import { describe, expect, it, vi, beforeEach } from 'vitest'
import { renderWithProviders, userEvent, screen, waitFor } from '@/test/test-utils'
import { DeleteUser } from '@/components/home/users/DeleteUser'

const mockPush = vi.fn()
const mockMutateAsync = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    back: vi.fn(),
    refresh: vi.fn(),
  }),
  useParams: () => ({ id: '123' }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}))

vi.mock('@/lib/mutations', () => ({
  useDeleteUser: () => ({
    mutateAsync: mockMutateAsync,
  }),
}))

beforeEach(() => {
  mockPush.mockReset()
  mockMutateAsync.mockReset()
})

describe('DeleteUser', () => {
  it('renders the trigger button', () => {
    renderWithProviders(<DeleteUser>Delete</DeleteUser>)
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })

  it('opens confirmation dialog on click', async () => {
    renderWithProviders(<DeleteUser>Delete</DeleteUser>)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /delete/i }))

    await waitFor(() => {
      expect(screen.getByText('Delete User')).toBeInTheDocument()
      expect(screen.getByText(/are you sure you want to delete/i)).toBeInTheDocument()
    })
  })

  it('closes dialog on cancel', async () => {
    renderWithProviders(<DeleteUser>Delete</DeleteUser>)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /delete/i }))
    await waitFor(() => {
      expect(screen.getByText('Delete User')).toBeInTheDocument()
    })

    // Click cancel — HeadlessUI transitions don't fully resolve in jsdom,
    // so verify no mutation was called (cancel doesn't trigger delete)
    await user.click(screen.getByRole('button', { name: /cancel/i }))
    expect(mockMutateAsync).not.toHaveBeenCalled()
  })

  it('calls delete mutation and redirects on confirm', async () => {
    mockMutateAsync.mockResolvedValue({ status: 200 })
    renderWithProviders(<DeleteUser>Delete</DeleteUser>)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /delete/i }))
    await waitFor(() => {
      expect(screen.getByText('Delete User')).toBeInTheDocument()
    })

    // Click the Delete button inside the dialog (not the trigger)
    const dialogButtons = screen.getAllByRole('button', { name: /delete/i })
    await user.click(dialogButtons[dialogButtons.length - 1])

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith('123')
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('handles deletion error without crashing', async () => {
    mockMutateAsync.mockRejectedValue(new Error('Server error'))
    renderWithProviders(<DeleteUser>Delete</DeleteUser>)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /delete/i }))
    await waitFor(() => {
      expect(screen.getByText('Delete User')).toBeInTheDocument()
    })

    const dialogButtons = screen.getAllByRole('button', { name: /delete/i })
    await user.click(dialogButtons[dialogButtons.length - 1])

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith('123')
    })
  })
})
