import User from '../../models/user.model.js'
import generateAccessToken from '../../utils/generateAccessToken.js'
import generateRefreshToken from '../../utils/generateRefreshToken.js'
import { setCookies } from '../../shared/setCookies.js'

export const RegisterController = async (req, res) => {
  try {
    const { username, password, email } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' })
    }

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' })
    }

    if (email) {
      const existingEmail = await User.findOne({ email })
      if (existingEmail) {
        return res.status(400).json({ message: 'Email is already in use' })
      }
    }

    const newUser = new User({ username, password, email })
    await newUser.save()

    const accessToken = generateAccessToken(newUser)
    const refreshToken = generateRefreshToken(newUser)

    setCookies(res, 'accessToken', accessToken, 'accessToken')
    setCookies(res, 'refreshToken', refreshToken, 'refreshToken')

    const { password: _, ...userObject } = newUser.toObject()

    res.status(201).json({
      message: 'Registration successful',
      user: userObject,
    })
  } catch (err) {
    console.error('Registration error:', err)
    res.status(500).json({ message: 'Internal server error during registration' })
  }
}
