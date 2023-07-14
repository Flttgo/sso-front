import request from '@/utils/request'

const URLS = {
  INDEX: 'config/index'
}

export function config() {
  return request({
    url: URLS.INDEX,
    method: 'get'
  })
}
