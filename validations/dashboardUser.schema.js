import { z } from 'zod'

export const dashboardUserSchema = z
  .object({
    username: z.string().min(4, 'Username must be at least 4 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    firstName: z.string().min(2, 'First name is too short'),
    lastName: z.string().min(2, 'Last name is too short'),
    birthDate: z
      .union([z.string(), z.date()], {
        invalid_type_error: 'Invalid date',
      })
      .refine((val) => !!val, {
        message: 'Birth date is required',
      }),
    gender: z.enum(['male', 'female']),
    email: z.string().email('Invalid email'),
    phone: z.string().min(6, 'Phone must be at least 6 characters'),
    bio: z.string().min(4, 'Too short').max(160, 'Too long'),
    roles: z.array(z.string()).min(1, 'At least one role is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
