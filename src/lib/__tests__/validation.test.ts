import { describe, expect, it } from 'vitest'
import { createUserSchema, editUserSchema, loginSchema } from '@/lib/validation'

describe('loginSchema', () => {
  it('passes with valid email and password', () => {
    const result = loginSchema.safeParse({ email: 'user@example.com', password: 'secret123' })
    expect(result.success).toBe(true)
  })

  it('fails when email is empty', () => {
    const result = loginSchema.safeParse({ email: '', password: 'secret123' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Email is required')
    }
  })

  it('fails with invalid email format', () => {
    const result = loginSchema.safeParse({ email: 'not-an-email', password: 'secret123' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please enter a valid email')
    }
  })

  it('fails when password is empty', () => {
    const result = loginSchema.safeParse({ email: 'user@example.com', password: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Password is required')
    }
  })

  it('returns errors for both fields when both are empty', () => {
    const result = loginSchema.safeParse({ email: '', password: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0])
      expect(paths).toContain('email')
      expect(paths).toContain('password')
    }
  })
})

describe('createUserSchema', () => {
  const validUser = {
    firstName: 'John',
    lastName: 'Doe',
    gender: 'Male',
    jobTitle: 'Engineer',
    department: 'Engineering',
    email: 'john@example.com',
    salary: '75000',
  }

  it('passes with all valid fields', () => {
    const result = createUserSchema.safeParse(validUser)
    expect(result.success).toBe(true)
  })

  it('fails when firstName is empty', () => {
    const result = createUserSchema.safeParse({ ...validUser, firstName: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please enter a first name')
    }
  })

  it('fails when lastName is empty', () => {
    const result = createUserSchema.safeParse({ ...validUser, lastName: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please enter a last name')
    }
  })

  it('fails when department is empty', () => {
    const result = createUserSchema.safeParse({ ...validUser, department: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please select a department')
    }
  })

  it('fails with invalid email format', () => {
    const result = createUserSchema.safeParse({ ...validUser, email: 'bad-email' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please enter a valid email')
    }
  })

  it('fails when salary is empty', () => {
    const result = createUserSchema.safeParse({ ...validUser, salary: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Salary is required')
    }
  })

  it('fails when salary is not a number', () => {
    const result = createUserSchema.safeParse({ ...validUser, salary: 'abc' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Salary must be a number')
    }
  })

  it('fails when salary is zero', () => {
    const result = createUserSchema.safeParse({ ...validUser, salary: '0' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Salary must be greater than 0')
    }
  })

  it('fails when salary is negative', () => {
    const result = createUserSchema.safeParse({ ...validUser, salary: '-100' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Salary must be greater than 0')
    }
  })

  it('fails when salary exceeds 14 integer digits', () => {
    const result = createUserSchema.safeParse({ ...validUser, salary: '123456789012345' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('must not exceed 14 digits')
    }
  })

  it('fails when salary has more than 4 decimal places', () => {
    const result = createUserSchema.safeParse({ ...validUser, salary: '100.12345' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('must not exceed 14 digits')
    }
  })

  it('passes with decimal salary', () => {
    const result = createUserSchema.safeParse({ ...validUser, salary: '50000.50' })
    expect(result.success).toBe(true)
  })
})

describe('editUserSchema', () => {
  const validEdit = {
    firstName: 'John',
    lastName: 'Doe',
    gender: 'Male',
    jobTitle: 'Engineer',
    department: 'Engineering',
    email: 'john@example.com',
    salary: '75000',
    active: 'true' as const,
  }

  it('passes with all valid fields', () => {
    const result = editUserSchema.safeParse(validEdit)
    expect(result.success).toBe(true)
  })

  it('passes with active set to false', () => {
    const result = editUserSchema.safeParse({ ...validEdit, active: 'false' })
    expect(result.success).toBe(true)
  })

  it('fails when active is an invalid value', () => {
    const result = editUserSchema.safeParse({ ...validEdit, active: 'maybe' })
    expect(result.success).toBe(false)
  })

  it('fails when active is missing', () => {
    const { active, ...noActive } = validEdit
    const result = editUserSchema.safeParse(noActive)
    expect(result.success).toBe(false)
    if (!result.success) {
      const activeError = result.error.issues.find((i) => i.path.includes('active'))
      expect(activeError?.message).toBe('Please select a status')
    }
  })
})
