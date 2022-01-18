<template>
  <div class="home_background">
    <div>
      <top-entrance @routeEvent="toIndex" />
    </div>
    <div class="mt-10">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-btn
            rounded
            color="white"
            x-large
            block
            @click="toSignupPageAsUser()"
            ><h2 class="btn-text">はじめる</h2></v-btn>
          </v-col>
        </v-row>
      </v-container>
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
    currentuser: false
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
      if (this.isAuthenticated) {
        this.$router.push({ path: '/items' })
      }
    },
    toIndex () {
      this.$router.push({ path: '/items' })
    }
  }
}
</script>

<style>
.home_background {
  position: fixed;
  top: 0;
  left: 0;
  background: #57D26A;
  min-height: 100vh;
  width: 100%;
}
.btn-text {
  color:#57d26a;
}
</style>
