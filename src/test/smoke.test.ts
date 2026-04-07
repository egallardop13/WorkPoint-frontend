import { describe, expect, it } from 'vitest'
import { properCase } from '@/lib/utils'

describe('smoke test', () => {
  it('verifies test infrastructure works', () => {
    expect(properCase('hello')).toBe('Hello')
  })
})
