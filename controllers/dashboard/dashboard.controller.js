export const DashboardController = (req, res) => {
  res.status(200).json({
    message: `Welcome to the admin panel, ${req.user.username}`,
    data: {
      user: req.user,
    },
  })
}
