import { clearCookies } from '../../shared/setCookies.js'

export const LogoutController = (req, res) => {
  clearCookies(res)
  res.status(200).json({ message: 'Logged out successfully' })
}
