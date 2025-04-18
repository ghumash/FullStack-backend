import jwt from 'jsonwebtoken'
import User from '../../models/user.model.js'
import generateAccessToken from '../../utils/generateAccessToken.js'
import generateRefreshToken from '../../utils/generateRefreshToken.js'
import { setCookies } from '../../shared/setCookies.js'

export const RefreshController = async (req, res) => {
  try {
    const { refreshToken } = req.cookies
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token is missing' })
    }

    let decoded
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    } catch {
      return res.status(403).json({ message: 'Refresh token is invalid or expired' })
    }

    const user = await User.findById(decoded._id).select('-password')

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    const accessToken = generateAccessToken(user)
    const newRefreshToken = generateRefreshToken(user)

    setCookies(res, 'accessToken', accessToken, 'accessToken')
    setCookies(res, 'refreshToken', newRefreshToken, 'refreshToken')

    res.status(200).json({
      message: 'Access token refreshed',
      user,
    })
  } catch (err) {
    console.error('Refresh error:', err)
    res.status(500).json({ message: 'Internal server error during token refresh' })
  }
}
