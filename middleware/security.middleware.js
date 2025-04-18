import express from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

const applySecurityMiddleware = (app) => {
  app.use(express.json({ limit: '10kb' }))

  app.use(helmet())

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP. Try again later.',
  })

  app.use(limiter)
}

export default applySecurityMiddleware
