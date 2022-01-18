import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'
import css from './assets/css/main.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  Vuex,
  css,
  render: h => h(App)
}).$mount('#app')
