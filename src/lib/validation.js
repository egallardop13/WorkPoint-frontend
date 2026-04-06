import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

const salarySchema = z
  .string()
  .min(1, 'Salary is required')
  .refine((val) => !isNaN(Number(val)), 'Salary must be a number')
  .refine((val) => Number(val) > 0, 'Salary must be greater than 0')
  .refine((val) => {
    const [integerPart, decimalPart] = val.split('.')
    return integerPart.length <= 14 && (!decimalPart || decimalPart.length <= 4)
  }, 'Salary must not exceed 14 digits before the decimal and 4 digits after')

export const createUserSchema = z.object({
  firstName: z.string().min(1, 'Please enter a first name'),
  lastName: z.string().min(1, 'Please enter a last name'),
  gender: z.string().min(1, 'Please enter a gender'),
  jobTitle: z.string().min(1, 'Please enter a job title'),
  department: z.string().min(1, 'Please select a department'),
  email: z.string().min(1, 'Please enter an email').email('Please enter a valid email'),
  salary: salarySchema,
})

export const editUserSchema = z.object({
  firstName: z.string().min(1, 'Please enter a first name'),
  lastName: z.string().min(1, 'Please enter a last name'),
  jobTitle: z.string().min(1, 'Please enter a Job Title'),
  department: z.string().min(1, 'Please select a department'),
  email: z.string().min(1, 'Please enter an email').email('Please enter a valid email'),
  gender: z.string().min(1, 'Please enter a gender'),
  salary: salarySchema,
  active: z.enum(['true', 'false'], { required_error: 'Please select a status' }),
})
