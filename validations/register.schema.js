import { z } from 'zod'

export const registerSchema = z
  .object({
    username: z.string().min(5, 'Username must be at least 5 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    email: z.string().email().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
