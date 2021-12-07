<template>
  <div class="d-flex align-center">
    <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
      <router-link to="/" class="white--text">HOME</router-link>
      <router-link to="/about" class="white--text">About</router-link>
      <router-link to="/sign_in" class="white--text">ログイン</router-link>
      <button v-if="logedIn" @click="signOut">ログアウト</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Header',
  data: () => ({
  }),
  computed: {
    ...mapGetters('user', ['isAuthenticated']),
    logedIn () {
      return this.isAuthenticated
    }
  },
  methods: {
    ...mapActions('user', ['deleteSession']),
    signOut () {
      const logoutParams = {
        headers: {
          uid: this.$store.state.user.uid,
          'access-token': this.$store.state.user.accessToken,
          client: this.$store.state.user.client
        }
      }
      this.deleteSession(logoutParams)
    }
  }
}
</script>
