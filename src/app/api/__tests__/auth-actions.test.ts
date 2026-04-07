import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const mockCookieStore = {
  get: vi.fn((): { name: string; value: string } | undefined => undefined),
  set: vi.fn(),
  delete: vi.fn(),
}

vi.mock('next/headers', () => ({
  cookies: () => mockCookieStore,
}))

import { checkUser, getUserFromToken, loginUser, logoutUser } from '@/app/api/auth/actions'

beforeEach(() => {
  mockCookieStore.get.mockReset().mockReturnValue(undefined)
  mockCookieStore.set.mockReset()
  mockCookieStore.delete.mockReset()
})

describe('loginUser', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ token: 'mock-token', refreshToken: 'mock-refresh' }),
        })
      )
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('sets auth cookies on successful login', async () => {
    const result = await loginUser({ email: 'user@test.com', password: 'pass123' })

    expect(result).toEqual({ success: true })
    expect(mockCookieStore.set).toHaveBeenCalledWith('authToken', 'mock-token', expect.any(Object))
    expect(mockCookieStore.set).toHaveBeenCalledWith(
      'refreshToken',
      'mock-refresh',
      expect.any(Object)
    )
  })

  it('throws on invalid credentials', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ ok: false, status: 401 }))
    )

    await expect(loginUser({ email: 'bad@test.com', password: 'wrong' })).rejects.toThrow(
      'Invalid credentials'
    )
  })
})

describe('logoutUser', () => {
  it('deletes both auth cookies', async () => {
    const result = await logoutUser()

    expect(result).toEqual({ success: true })
    expect(mockCookieStore.delete).toHaveBeenCalledTimes(2)
  })
})

describe('checkUser', () => {
  it('returns null when no auth cookie exists', async () => {
    const result = await checkUser()
    expect(result).toBeNull()
  })

  it('returns userId from a valid JWT', async () => {
    const payload = { userId: '42', exp: 9999999999 }
    const fakeToken = `header.${btoa(JSON.stringify(payload))}.signature`
    mockCookieStore.get.mockReturnValue({ name: 'authToken', value: fakeToken })

    const result = await checkUser()
    expect(result).toBe('42')
  })

  it('returns null for a malformed token', async () => {
    mockCookieStore.get.mockReturnValue({ name: 'authToken', value: 'bad-token' })

    const result = await checkUser()
    expect(result).toBeNull()
  })
})

describe('getUserFromToken', () => {
  it('returns null when no auth cookie exists', async () => {
    const result = await getUserFromToken()
    expect(result).toBeNull()
  })

  it('returns decoded payload from a valid JWT', async () => {
    const payload = { userId: '42', exp: 9999999999 }
    const fakeToken = `header.${btoa(JSON.stringify(payload))}.signature`
    mockCookieStore.get.mockReturnValue({ name: 'authToken', value: fakeToken })

    const result = await getUserFromToken()
    expect(result).toEqual(payload)
  })
})
