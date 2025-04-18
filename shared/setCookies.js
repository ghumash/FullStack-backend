import { isProd } from './const.js'

const baseOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? 'None' : 'Lax',
  path: '/'
}

const cookieOptions = {
  accessToken: {
    ...baseOptions,
    maxAge: 15 * 60 * 1000,
  },
  refreshToken: {
    ...baseOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
  clear: {
    ...baseOptions,
    maxAge: 0,
  },
}

export function setCookies(res, name, value, type = 'accessToken') {
  res.cookie(name, value, cookieOptions[type] || cookieOptions.accessToken)
}

export function clearCookies(res) {
  res.clearCookie('accessToken', cookieOptions.clear)
  res.clearCookie('refreshToken', cookieOptions.clear)
}
