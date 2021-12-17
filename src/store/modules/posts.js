import axios from 'axios'

const apiUrlBase = 'http://localhost:3000/v1/items'

const state = {
  posts: []
}

const getters = {
  posts: state => state.posts.sort((a, b) => b.id - a.id)
}

const mutations = {
  setPosts: (state, posts) => (state.posts = posts),
  appendPost: (state, post) => (state.posts = [...state.posts, post]),
  removePost: (state, id) =>
    (state.posts = state.posts.filter(post => post.id !== id))
}

const actions = {
  async fetchPosts ({ commit }) {
    try {
      const response = await axios.get(`${apiUrlBase}`)
      commit('setPosts', response.data)
    } catch (e) {
      console.error(e)
    }
  },
  async createPost ({ commit }, item) {
    await axios.post(`${apiUrlBase}`, item)
      .then(response => { commit('appendPost', response.data) })
      .catch(err => console.log(err))
    console.log(item)
  },
  async deletePost ({ commit }, id) {
    try {
      axios.delete(`${apiUrlBase}/${id}`)
      commit('removePost', id)
    } catch (e) {
      console.error(e)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
