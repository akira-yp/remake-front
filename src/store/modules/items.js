import axios from 'axios'

const apiUrlBase = 'http://localhost:3000/v1/items'

const state = {
  items: []
}

const getters = {
  items: state => state.items.sort((a, b) => b.id - a.id)
}

const mutations = {
  appendItems: (state, items) => (state.items = [...items])
}

const actions = {
  async fetchItems ({ commit }) {
    await axios.get(`${apiUrlBase}`)
      .then(response => commit('appendItems', response.data))
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
