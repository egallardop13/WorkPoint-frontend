import { describe, expect, it, vi, beforeEach } from 'vitest'
import { renderWithProviders, userEvent, screen, waitFor } from '@/test/test-utils'

const mockPush = vi.fn()

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

vi.mock('next/image', () => ({
  default: ({ alt, ...props }: { alt: string; [key: string]: unknown }) => <img alt={alt} />,
}))

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light' }),
}))

vi.mock('@/app/api/auth/actions', () => ({
  loginUser: vi.fn(),
}))

import { loginUser } from '@/app/api/auth/actions'

const mockLoginUser = vi.mocked(loginUser)

beforeEach(() => {
  mockPush.mockReset()
  mockLoginUser.mockReset()
})

// Lazy import to ensure mocks are set up first
async function renderLoginPage() {
  const LoginPage = (await import('@/app/login/page')).default
  return renderWithProviders(<LoginPage />)
}

describe('Login Page', () => {
  it('renders the login form', async () => {
    await renderLoginPage()

    expect(screen.getByText('Sign in to your account')).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('calls loginUser and redirects on success', async () => {
    mockLoginUser.mockResolvedValue({ success: true })
    await renderLoginPage()
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/email address/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('shows error message on failed login', async () => {
    mockLoginUser.mockRejectedValue(new Error('Invalid credentials'))
    await renderLoginPage()
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/email address/i), 'bad@test.com')
    await user.type(screen.getByLabelText(/password/i), 'wrong')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
    })
  })

  it('shows redirecting state after successful login', async () => {
    mockLoginUser.mockResolvedValue({ success: true })
    await renderLoginPage()
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/email address/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /redirecting/i })).toBeInTheDocument()
    })
  })
})
