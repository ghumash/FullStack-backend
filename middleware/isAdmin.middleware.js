const isAdmin = (req, res, next) => {
  const roles = req.user?.roles

  if (Array.isArray(roles) && roles.includes('admin')) {
    return next()
  }

  return res.status(403).json({
    message: 'Access denied: administrator role required',
    code: 'ERR_ADMIN_ONLY',
  })
}

export default isAdmin
