<template>
  <div>

    <top-entrance />
    <v-btn rounded @click="toSignupPageAsUser()">アカウント登録する</v-btn>
    <v-btn rounded @click="toSignupPageAsDesigner()">デザイナーとして登録する場合はこちら</v-btn>
  </div>
</template>

<script>
import TopEntrance from '../components/TopEntrance.vue'

export default {
  name: 'Home',
  components: {
    TopEntrance
  },
  data: () => ({
  }),
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
    }
  }
}
</script>
