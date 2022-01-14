<template>
  <div>
    <div>
      <top-entrance @routeEvent="toIndex" />
    </div>
    <div class="mt-10">
      <v-container>
        <v-row justify="center">
          <v-btn
          rounded
          @click="toSignupPageAsUser()"
          class="ma-2"
          color="accent"
          >
            アカウント登録する
          </v-btn>
        </v-row>
        <v-row justify="center">
          <v-btn
          rounded
          @click="toSignupPageAsDesigner()"
          class="ma-2"
          color="accent"
          >デザイナーとして登録する場合はこちら
          </v-btn>
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
