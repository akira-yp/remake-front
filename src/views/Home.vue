<template>
  <div>

    <top-entrance />
    <div v-if="!currentuser">
      <v-btn rounded @click="toSignupPageAsUser()">アカウント登録する</v-btn>
      <v-btn rounded @click="toSignupPageAsDesigner()">デザイナーとして登録する場合はこちら</v-btn>
    </div>
  </div>
</template>

<script>
import TopEntrance from '../components/TopEntrance.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    TopEntrance
  },
  data: () => ({
    currentuser: Boolean
  }),
  created () {
    this.logedIn()
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated'])
  },
  methods: {
    toSignupPageAsDesigner () {
      this.$router.push({
        path: '/sign_up',
        query: {
          designer: true
        }
      })
    },
    toSignupPageAsUser () {
      this.$router.push({
        path: '/sign_up',
        query: {
          designer: false
        }
      })
    },
    logedIn () {
      this.currentuser = this.isAuthenticated
    }
  }
}
</script>
