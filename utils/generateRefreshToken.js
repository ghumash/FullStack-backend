import jwt from 'jsonwebtoken'

const generateRefreshToken = (user) => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET is not defined in environment variables')
  }

  const payload = {
    _id: user._id,
  }

  const options = {
    expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d',
  }

  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, options)
}

export default generateRefreshToken
