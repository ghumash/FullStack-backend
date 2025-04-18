const errorHandler = (err, req, res, next) => {
  console.error('💥 Error:', err)

  const statusCode = res.statusCode >= 400 ? res.statusCode : 500

  if (err.name === 'ZodError') {
    return res.status(400).json({
      message: 'Validation error',
      errors: err.errors,
    })
  }

  res.status(statusCode).json({
    message: err.message || 'Server Error',
    code: err.code || null,
    stack: process.env.APP_VERSION === 'production' ? '🥞' : err.stack,
  })
}

export default errorHandler
