import User from '../../models/user.model.js'

export const CreateUserController = async (req, res) => {
  try {
    const { username, password, firstName, lastName, email, phone, bio, birthDate, gender, roles = ['user'] } = req.body

    if (!username || !password || !email) {
      return res.status(400).json({ message: 'Username, password and email are required' })
    }

    const existingUsername = await User.findOne({ username })
    if (existingUsername) {
      return res.status(400).json({ message: 'Username is already taken' })
    }

    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      return res.status(400).json({ message: 'Email is already in use' })
    }

    const newUser = new User({
      username,
      password,
      firstName,
      lastName,
      email,
      phone,
      bio,
      birthDate,
      gender,
      roles,
    })

    await newUser.save()

    const { password: _, ...userObject } = newUser.toObject()

    res.status(201).json({
      message: 'User created successfully',
      user: userObject,
    })
  } catch (err) {
    console.error('Create user error:', err)
    res.status(500).json({ message: 'Internal server error during user creation' })
  }
}
