import request from '@/utils/request'

const URLS = {
  LOGIN: 'user/login',
  INFO: 'user/me',
  LOGOUT: 'user/logout'
}

export function login(data) {
  return request({
    url: URLS.LOGIN,
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: URLS.INFO,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: URLS.LOGOUT,
    method: 'post'
  })
}
