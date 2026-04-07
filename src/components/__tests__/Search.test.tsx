import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockReplace = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace, push: vi.fn(), back: vi.fn(), refresh: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/dashboard',
}))

vi.mock('use-debounce', () => ({
  useDebouncedCallback: (fn: (...args: unknown[]) => void) => fn,
}))

import Search from '../Search'

describe('Search', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders input with placeholder', () => {
    render(<Search placeholder="Search users…" />)
    expect(screen.getByPlaceholderText('Search users…')).toBeInTheDocument()
  })

  it('updates URL with query param on input', async () => {
    const user = userEvent.setup()
    render(<Search placeholder="Search…" />)
    const input = screen.getByPlaceholderText('Search…')

    await user.type(input, 'john')

    expect(mockReplace).toHaveBeenCalled()
    const lastCall = mockReplace.mock.calls[mockReplace.mock.calls.length - 1][0] as string
    expect(lastCall).toContain('query=john')
  })

  it('resets page to 1 when searching', async () => {
    const user = userEvent.setup()
    render(<Search placeholder="Search…" />)

    await user.type(screen.getByPlaceholderText('Search…'), 'a')

    const lastCall = mockReplace.mock.calls[mockReplace.mock.calls.length - 1][0] as string
    expect(lastCall).toContain('page=1')
  })

  it('removes query param when input is cleared', async () => {
    const user = userEvent.setup()
    render(<Search placeholder="Search…" />)
    const input = screen.getByPlaceholderText('Search…')

    await user.type(input, 'a')
    await user.clear(input)

    const lastCall = mockReplace.mock.calls[mockReplace.mock.calls.length - 1][0] as string
    expect(lastCall).not.toContain('query=')
  })
})
