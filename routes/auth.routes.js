import express from 'express'
import { RegisterController } from '../controllers/auth/register.controller.js'
import { LoginController } from '../controllers/auth/login.controller.js'
import { RefreshController } from '../controllers/auth/refresh.controller.js'
import { LogoutController } from '../controllers/auth/logout.controller.js'
import validate from '../middleware/zod.middleware.js'
import { loginSchema } from '../validations/login.schema.js'
import { registerSchema } from '../validations/register.schema.js'

const router = express.Router()

router.post('/register', validate(registerSchema), RegisterController)
router.post('/login', validate(loginSchema), LoginController)
router.post('/refresh', RefreshController)
router.post('/logout', LogoutController)

export default router
