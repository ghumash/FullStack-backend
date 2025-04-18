import { z } from 'zod'

export const updateSecuritySchema = z
  .object({
    oldPassword: z
      .string({ required_error: 'Current password is required' })
      .min(6, 'Password must be at least 6 characters'),
    newPassword: z.string({ required_error: 'New password is required' }).min(6, 'Password must be at least 6 characters'),
    confirmNewPassword: z.string({ required_error: 'Please confirm your new password' }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: 'New passwords do not match',
  })
