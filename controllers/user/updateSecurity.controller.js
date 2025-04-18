import bcrypt from 'bcryptjs'
import User from '../../models/user.model.js'

export const updateSecurityController = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmNewPassword } = req.body

    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: 'New passwords do not match' })
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' })
    }

    user.password = newPassword
    await user.save()

    return res.status(200).json({
      message: 'Password updated successfully',
    })
  } catch (error) {
    console.error('Error updating password:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
