import express from 'express'
import protect from '../middleware/auth.middleware.js'
import { UpdateProfileController } from '../controllers/user/updateProfile.controller.js'
import validate from '../middleware/zod.middleware.js'
import { updateUserSchema } from '../validations/user.schema.js'
import { updateSecuritySchema } from '../validations/security.schema.js'
import { updateSecurityController } from '../controllers/user/updateSecurity.controller.js'

const router = express.Router()
router.put('/settings/profile', protect, validate(updateUserSchema), UpdateProfileController)
router.put('/settings/security', protect, validate(updateSecuritySchema), updateSecurityController)

export default router
