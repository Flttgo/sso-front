import request from '@/utils/request'

const URLS = {
  VALID: 'callback/valid'
}

export function callbackValid(data) {
  return request({
    url: URLS.VALID,
    method: 'post',
    data
  })
}
