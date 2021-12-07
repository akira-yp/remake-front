import axios from 'axios'

const apiUrl = 'http://localhost:3000'

const state = {
  name: null,
  id: null,
  accessToken: null,
  uid: null,
  client: null,
  designer: false,
  expiry: null
}

const getters = {
  user: state => state,
  isAuthenticated (state) {
    return !!state.uid
  }
}

const mutations = {
  setUser (state, user) {
    [state.name, state.id, state.uid, state.accessToken, state.client, state.designer, state.expiry] = [
      user.data.data.name,
      user.data.data.id,
      user.data.data.uid,
      user.headers['access-token'],
      user.headers.client,
      user.data.data.designer,
      user.headers.expiry
    ]
    localStorage.setItem('headers', JSON.stringify({
      accessToken: user.headers['access-token'],
      client: user.headers.client,
      uid: user.data.data.uid
    }))
  },
  removeUser (state) {
    state.name = null
    state.id = null
    state.accessToken = null
    state.uid = null
    state.client = null
    state.designer = false
    state.expiry = null
    localStorage.removeItem('headers')
  }

}

const actions = {
  async authUser ({ commit }, auth) {
    await axios.post(`${apiUrl}/v1/auth/sign_in`, auth)
      .then(response => { commit('setUser', response) })
      .catch(error => { console.log(error) })
  },
  async deleteSession ({ commit }, auth) {
    await axios.delete(`${apiUrl}/v1/auth/sign_out`, auth)
      .then(response => { commit('removeUser', response) })
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