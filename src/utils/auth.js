import Cookies from 'js-cookie'

const TokenKey = 'token'

const PortalKey = '_identity-portal'

const DmpKey = 'dmp-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getExpireIn() {
  return Cookies.get('expire_in')
}

export function setToken(token, seconds) {
  const expires = new Date(new Date().getTime() + seconds * 1000)
  return Cookies.set(TokenKey, token, { expires: expires })
}

export function setAuthToken(key, value, seconds) {
  const expires = new Date(new Date().getTime() + seconds * 1000)
  return Cookies.set(key, value, { expires: expires })
}

const ssoKey = 'sso-url'
export function setSsoHome(value, seconds) {
  const expires = new Date(new Date().getTime() + seconds * 1000)
  return Cookies.set(ssoKey, value, { expires: expires })
}

const ssoUsername = 'sso-username'
export function setSsoUsername(value, seconds) {
  const expires = new Date(new Date().getTime() + seconds * 1000)
  return Cookies.set(ssoUsername, value, { expires: expires })
}

export function setExpireIn(value) {
  const expires = new Date(new Date().getTime() + value * 1000)
  return Cookies.set('expire_in', value, { expires: expires })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removePortalToken() {
  return Cookies.remove(PortalKey)
}

export function removeDmpToken() {
  return Cookies.remove(DmpKey)
}

export function removeSsoUsername() {
  return Cookies.remove(ssoUsername)
}

export function removeSsoHome() {
  return Cookies.remove(ssoKey)
}

export function removeAllCookie() {
  removeToken()
  removePortalToken()
  removeDmpToken()
  removeSsoUsername()
}
