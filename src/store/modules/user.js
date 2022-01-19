import axios from 'axios'

const apiUrl = 'http://localhost:3000'

const state = {
  name: null,
  id: null,
  accessToken: null,
  uid: null,
  client: null,
  designer: null,
  expiry: null,
  avatar: null
}

const getters = {
  isDesigner (state) {
    return state.designer === true
  },
  getAvatar: state => state.avatar,
  userId: state => state.id,
  user: state => state,
  isAuthenticated (state) {
    return !!state.uid
  }
}

const mutations = {
  setUser: (state, user) => {
    // console.log(user.data)
    // state.id = user.data.data.id
    // state.name = user.data.data.name
    // state.uid = user.data.data.uid
    // state.accessToken = user.headers['access-token']
    // state.client = user.headers.client
    // state.designer = user.data.data.designer
    // state.expiry = user.headers.expiry
    [state.name, state.id, state.uid, state.accessToken, state.client, state.designer, state.expiry] = [
      user.data.data.name,
      user.data.data.id,
      user.data.data.uid,
      user.headers['access-token'],
      user.headers.client,
      user.data.data.designer,
      user.headers.expiry
    ]
    console.log(user)
    localStorage.setItem('headers', JSON.stringify({
      accessToken: user.headers['access-token'],
      client: user.headers.client,
      uid: user.data.data.uid,
      id: user.data.data.id,
      designer: user.data.data.designer,
      expiry: user.header.expiry,
      name: user.data.data.name
    }))
  },
  removeUser: (state) => {
    state.name = null
    state.id = null
    state.accessToken = null
    state.uid = null
    state.client = null
    state.designer = false
    state.expiry = null
    localStorage.removeItem('headers')
    localStorage.removeItem('avatar')
  },
  setAuthData: (state, user) => {
    state.accessToken = user.accessToken
    state.client = user.client
    state.uid = user.uid
    state.id = user.id
    state.expiry = user.expiry
    state.designer = user.designer
    state.name = user.name
    state.avatar = user.avatar
  },
  setAvatar: (state, user) => {
    state.avatar = user.data.avatar_url
    localStorage.setItem('avatar', user.data.avatar_url)
  }
}

const actions = {
  async authUser ({ commit }, auth) {
    await axios.post(`${apiUrl}/v1/auth/sign_in`, auth)
      .then(response => { commit('setUser', response) })
      .catch(error => { return error })
  },
  async deleteSession ({ commit }, auth) {
    await axios.delete(`${apiUrl}/v1/auth/sign_out`, auth)
      .then(response => { commit('removeUser', response) })
      .catch(error => { console.log(error) })
  },
  setAuthToStore ({ commit }, authData) {
    commit('setAuthData', authData)
  },
  async createUser ({ commit }, user) {
    await axios.post(`${apiUrl}/v1/auth`, user)
      .then(response => { commit('setUser', response) })
      .catch(error => { console.log(error) })
  },
  async fetchAvatar ({ commit }, user) {
    await axios.get(`${apiUrl}/v1/profiles/${user}`)
      .then(response => { commit('setAvatar', response) })
      .catch(error => { console.log(error) })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
