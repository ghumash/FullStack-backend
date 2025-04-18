import { z } from 'zod'

export const updateUserSchema = z.object({
  firstName: z.string().min(2, 'First name is too short'),
  lastName: z.string().min(2, 'Last name is too short'),
  birthDate: z
    .string()
    .datetime()
    .or(z.date())
    .refine((val) => !!val, {
      message: 'Birth date is required',
    }),
  gender: z.enum(['male', 'female']),
  email: z.string().email('Invalid email'),
  phone: z.string().min(6, 'Phone must be at least 6 characters'),
  bio: z.string().min(4, 'Too short').max(160, 'Too long'),
})
