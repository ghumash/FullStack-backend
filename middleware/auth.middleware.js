import jwt from 'jsonwebtoken'

const protect = (req, res, next) => {
  const token = req.cookies?.accessToken

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' })
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch (err) {
    console.error('Protect middleware error:', err.message)
    res.status(401).json({ message: 'Invalid or expired access token' })
  }
}

export default protect
