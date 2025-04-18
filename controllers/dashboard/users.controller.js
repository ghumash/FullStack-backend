import User from '../../models/user.model.js'

export const UsersController = async (req, res) => {
  try {
    const users = await User.find().select('-password')

    res.status(200).json({
      message: 'User list retrieved successfully',
      users,
    })
  } catch (err) {
    console.error('Failed to get users:', err)
    res.status(500).json({ message: 'Failed to retrieve users' })
  }
}
