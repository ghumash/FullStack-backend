import User from '../../models/user.model.js'

export const DeleteUserController = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    await user.deleteOne()
    res.status(200).json({ _id: id, message: 'User deleted successfully' })
  } catch (err) {
    console.error('Delete user error:', err)
    res.status(500).json({ message: 'Internal server error during user deletion' })
  }
}
