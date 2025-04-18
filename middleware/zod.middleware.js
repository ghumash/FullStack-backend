import { ZodError } from 'zod'

const validate =
  ({ body, query, params }) =>
  (req, res, next) => {
    try {
      if (body) req.body = body.parse(req.body)
      if (query) req.query = query.parse(req.query)
      if (params) req.params = params.parse(req.params)

      next()
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: 'Invalid input data',
          errors: err.errors,
        })
      }

      console.error('Unexpected validation error:', err)
      return res.status(500).json({ message: 'Server error during validation' })
    }
  }

export default validate
