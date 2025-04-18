import sanitizeHtml from 'sanitize-html'

const sanitizeRequestBody = (req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body)
  }
  next()
}

const sanitizeObject = (obj) => {
  const clean = {}

  for (const key in obj) {
    const value = obj[key]

    if (typeof value === 'string') {
      clean[key] = sanitizeHtml(value, {
        allowedTags: [],
        allowedAttributes: {},
      })
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      clean[key] = sanitizeObject(value)
    } else {
      clean[key] = value
    }
  }

  return clean
}

export default sanitizeRequestBody
