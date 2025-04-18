import User from '../../models/user.model.js'

export const UpdateUserController = async (req, res) => {
  try {
    const { id } = req.params

    const allowedFields = ['firstName', 'lastName', 'email', 'phone', 'bio', 'birthDate', 'gender', 'roles']

    const updates = {}

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field]
      }
    }

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (updates.email && updates.email !== user.email) {
      const existing = await User.findOne({ email: updates.email })
      if (existing) {
        return res.status(400).json({ message: 'Email is already in use' })
      }
    }

    Object.assign(user, updates)
    await user.save()

    const { password, ...userObject } = user.toObject()

    res.status(200).json({
      message: 'User updated successfully',
      user: userObject,
    })
  } catch (err) {
    console.error('Update user error:', err)
    res.status(500).json({ message: 'Internal server error during user update' })
  }
}
