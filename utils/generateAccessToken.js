import jwt from 'jsonwebtoken'

const generateAccessToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables')
  }

  const payload = {
    _id: user._id,
    username: user.username,
    roles: user.roles,
  }

  const options = {
    expiresIn: process.env.JWT_ACCESS_EXPIRES || '15m',
  }

  return jwt.sign(payload, process.env.JWT_SECRET, options)
}

export default generateAccessToken
