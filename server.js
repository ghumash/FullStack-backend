import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'

import applySecurityMiddleware from './middleware/security.middleware.js'
import errorHandler from './middleware/errorHandler.middleware.js'
import sanitizeRequestBody from './middleware/sanitize.middleware.js'

dotenv.config()

const app = express()

// ===== Middleware: Base =====
app.use(express.json({ limit: '10kb' }))
app.use(cookieParser())
app.use((req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    return sanitizeRequestBody(req, res, next)
  }
  next()
})
// ===== Middleware: Security =====
applySecurityMiddleware(app)

// ===== Middleware: CORS =====
app.use(
  cors({
    origin: process.env.CLIENT_PORT,
    credentials: true,
  }),
)

// ===== Routes =====
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/dashboard', dashboardRoutes)

// ===== Error Handler =====
app.use(errorHandler)

// ===== MongoDB & Server Start =====

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('🌐 MongoDB connected')
    const PORT = process.env.PORT || 4000
    app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`))
  })
  .catch((err) => console.error('MongoDB error:', err))
