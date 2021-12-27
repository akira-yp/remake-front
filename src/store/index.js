import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import posts from './modules/posts'
import items from './modules/items'
import designers from './modules/designers'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    posts,
    items,
    designers
  }
})
