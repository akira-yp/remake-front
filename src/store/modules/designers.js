import axios from 'axios'

const apiUrl = 'http://localhost:3000/v1'

const state = {
  designers: []
}

const getters = {
  designers: state => state.designers
}

const mutations = {
  setDesigners: (state, designers) => (state.designers = [...designers])
}

const actions = {
  async fetchDesigners ({ commit }, designers) {
    await axios.get(`${apiUrl}/users`, designers)
      .then(response => { commit('setDesigners', response.data) })
      .catch(err => console.log(err))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
