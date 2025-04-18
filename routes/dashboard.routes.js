import express from 'express'
import protect from '../middleware/auth.middleware.js'
import isAdmin from '../middleware/isAdmin.middleware.js'
import validate from '../middleware/zod.middleware.js'
import { DashboardController } from '../controllers/dashboard/dashboard.controller.js'
import { UsersController } from '../controllers/dashboard/users.controller.js'
import { UpdateUserController } from '../controllers/dashboard/updateUser.controller.js'
import { dashboardUserSchema } from '../validations/dashboardUser.schema.js'
import { CreateUserController } from '../controllers/dashboard/createUser.controller.js'
import { DeleteUserController } from '../controllers/dashboard/deleteUser.controller.js'

const router = express.Router()
router.get('/', protect, isAdmin, DashboardController)
router.get('/users', protect, isAdmin, UsersController)
router.put('/users/:id', protect, isAdmin, validate(dashboardUserSchema), UpdateUserController)
router.post('/users', protect, isAdmin, validate(dashboardUserSchema), CreateUserController)
router.delete('/users/:id', protect, isAdmin, DeleteUserController)
export default router
