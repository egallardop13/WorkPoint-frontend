import { describe, expect, it } from 'vitest'
import { calculateRate, formatCurrency, isActive, properCase } from '@/lib/utils'

describe('properCase', () => {
  it('capitalizes the first letter and lowercases the rest', () => {
    expect(properCase('hello')).toBe('Hello')
  })

  it('handles all uppercase input', () => {
    expect(properCase('HELLO')).toBe('Hello')
  })

  it('handles mixed case input', () => {
    expect(properCase('hELLO')).toBe('Hello')
  })

  it('handles empty string', () => {
    expect(properCase('')).toBe('')
  })

  it('handles single character', () => {
    expect(properCase('a')).toBe('A')
  })
})

describe('formatCurrency', () => {
  it('formats a whole number with commas and decimals', () => {
    expect(formatCurrency(1000)).toBe('$1,000.00')
  })

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })

  it('formats a large number', () => {
    expect(formatCurrency(1234567.89)).toBe('$1,234,567.89')
  })

  it('formats a decimal value', () => {
    expect(formatCurrency(0.5)).toBe('$0.50')
  })
})

describe('isActive', () => {
  it('returns Active for "true"', () => {
    expect(isActive('true')).toBe('Active')
  })

  it('returns Inactive for "false"', () => {
    expect(isActive('false')).toBe('Inactive')
  })

  it('returns Inactive for any other string', () => {
    expect(isActive('anything')).toBe('Inactive')
  })
})

describe('calculateRate', () => {
  it('calculates percentage correctly', () => {
    expect(calculateRate(100, 25)).toBe(25.0)
  })

  it('returns 0 when totalUsers is 0', () => {
    expect(calculateRate(0, 0)).toBe(0)
  })

  it('rounds to one decimal place', () => {
    expect(calculateRate(3, 1)).toBe(33.3)
  })

  it('returns 100 when all users are in category', () => {
    expect(calculateRate(1000, 1000)).toBe(100.0)
  })
})
