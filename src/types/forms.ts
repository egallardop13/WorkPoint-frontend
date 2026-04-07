import type { z } from 'zod'
import type { loginSchema, createUserSchema, editUserSchema } from '@/lib/validation'

export type LoginInput = z.infer<typeof loginSchema>
export type CreateUserInput = z.infer<typeof createUserSchema>
export type EditUserInput = z.infer<typeof editUserSchema>
