import { getInfo, login, logout } from '@/api/user'
import {
  getToken, removeAllCookie,
  setAuthToken, setSsoHome, setSsoUsername,
  setToken
} from '@/utils/auth'
import { resetRouter } from '@/router'
import { Base64 } from 'js-base64'
import { callbackValid } from '@/api/callback'

import logo from '@/assets/sso.gif'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: logo,
    username: null,
    org_code: null,
    auth_key: null,
    status: null,
    expire_in: null
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERNAME: (state, username) => {
    const generateRandomString = () => {
      return Math.floor(Math.random() * Date.now()).toString(36)
    }
    state.username = Base64.encode(username) + '.' + generateRandomString()
  },
  SET_AVATAR: (state, avatar) => {
    if (avatar) {
      state.avatar = avatar
    }
  },
  SET_ORG_CODE: (state, org_code) => {
    state.org_code = org_code
  },
  SET_AUTH_KEY: (state, auth_key) => {
    state.auth_key = auth_key
  },
  SET_STATUS: (state, status) => {
    state.status = status
  },
  SET_EXPIRE_IN: (state, expire_in) => {
    state.expire_in = expire_in
  }
}

const actions = {
  // 系统登录认证
  login({ commit }, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: account.trim(), password: password }).then(response => {
        autoLogin(commit, response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 外部跳转认证
  validCallback({ commit }, userInfo) {
    const { token } = userInfo
    return new Promise((resolve, reject) => {
      callbackValid({ token: token }).then(response => {
        if (response.code === 0) {
          autoLogin(commit, response)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const { username, name, avatar, org_code, key, status } = data
        commit('SET_USERNAME', username)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_ORG_CODE', org_code)
        commit('SET_AUTH_KEY', key)
        commit('SET_STATUS', status)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeAllCookie()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeAllCookie()
      commit('RESET_STATE')
      resolve()
    })
  }
}

function autoLogin(commit, response) {
  const { token, expire_in, username, sso_home } = response.data
  commit('SET_TOKEN', token)
  commit('SET_EXPIRE_IN', expire_in)
  setToken(token, expire_in)

  setSsoUsername(username, expire_in)
  //  设置主页地址
  setSsoHome(sso_home, expire_in * 2)

  return true
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
