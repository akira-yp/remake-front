import Vue from 'vue'
import VueRouter from 'vue-router'
// import Store from '../store/index.js'
import Home from '../views/Home.vue'
import ItemCreate from '../views/ItemCreate.vue'
import SignIn from '../views/SignIn.vue'
import ItemDetails from '../views/ItemDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // meta: { requireAuth: true }
  },
  {
    path: '/itemcreate',
    name: 'ItemCreate',
    component: ItemCreate
  },
  {
    path: '/sign_in',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/item',
    name: 'ItemDetails',
    component: ItemDetails
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requireAuth) && !Store.state.user.accessToken) {
//     next({ path: '/sign_in', query: { redirect: to.fullPath } })
//   } else {
//     next()
//   }
// })

export default router
