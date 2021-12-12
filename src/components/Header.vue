<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>RemakeTree</v-toolbar-title>
    <v-btn v-if="logedIn" @click="signOut">ログアウト</v-btn>
  </v-app-bar>
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
    },
    drawer () {
      this.$emit('toggleDrawer')
    }
  }
}
</script>
