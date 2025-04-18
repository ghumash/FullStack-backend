import User from '../../models/user.model.js'
import generateAccessToken from '../../utils/generateAccessToken.js'
import generateRefreshToken from '../../utils/generateRefreshToken.js'
import { setCookies } from '../../shared/setCookies.js'

export const LoginController = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' })
    }

    const user = await User.findOne({ username })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid username or password' })
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    setCookies(res, 'accessToken', accessToken, 'accessToken')
    setCookies(res, 'refreshToken', refreshToken, 'refreshToken')

    const userObject = user.toObject()
    delete userObject.password

    res.status(200).json({
      message: 'Login successful',
      user: userObject,
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: 'Internal server error during login' })
  }
}
