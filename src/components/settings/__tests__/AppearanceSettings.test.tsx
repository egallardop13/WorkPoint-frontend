import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockSetTheme = vi.fn()

vi.mock('next-themes', () => ({
  useTheme: () => ({
    resolvedTheme: 'light',
    setTheme: mockSetTheme,
  }),
}))

import AppearanceSettings from '../AppearanceSettings'

describe('AppearanceSettings', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders dark mode label and description', () => {
    render(<AppearanceSettings />)

    expect(screen.getByText('Dark mode')).toBeInTheDocument()
    expect(screen.getByText('Switch between light and dark theme')).toBeInTheDocument()
  })

  it('renders a switch element', () => {
    render(<AppearanceSettings />)

    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('calls setTheme when switch is clicked', async () => {
    const user = userEvent.setup()
    render(<AppearanceSettings />)

    await user.click(screen.getByRole('switch'))

    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })
})
