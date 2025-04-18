import User from '../../models/user.model.js'

export const UpdateProfileController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const { firstName, lastName, birthDate, gender, email, phone, bio } = req.body

    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email })
      if (existingEmail) {
        return res.status(400).json({ message: 'Email is already in use' })
      }
    }

    Object.assign(user, {
      firstName,
      lastName,
      birthDate,
      gender,
      email,
      phone,
      bio,
    })

    await user.save()

    const safeUser = await User.findById(user._id).select('-password')

    res.status(200).json({
      message: 'Profile updated successfully',
      user: safeUser,
    })
  } catch (err) {
    console.error('Profile update error:', err)
    res.status(500).json({ message: 'Failed to update profile', error: err.message })
  }
}
