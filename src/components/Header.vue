<template>
  <!-- <div> -->
     <!-- <v-navigation-drawer
      v-model="drawer"
      temporary
      app
    >
      <v-list>
        <v-list-item>
          <router-link to="/" class="white--text">HOME</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/about" class="white--text">About</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/sign_in" class="white--text">ログイン</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/itemcreate" class="white--text">アイテムを出品する</router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>RemakeTree</v-toolbar-title>
      <v-btn v-if="logedIn" @click="signOut">ログアウト</v-btn>
    </v-app-bar>
<!--
    <v-main>

    </v-main>
  </div> -->
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
