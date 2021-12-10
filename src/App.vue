<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      app
    >
      <v-list>
        <v-list-item>
          <router-link to="/" >HOME</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/about">About</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/sign_in" >ログイン</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/itemcreate" >アイテムを出品する</router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>RemakeTree</v-toolbar-title>
      <v-btn v-if="logedIn" depressed="false" @click="signOut">ログアウト</v-btn>
    </v-app-bar>

    <!-- <v-app-bar
      app
      color="primary"
      dark
    > -->
      <!-- <div class="d-flex align-center">
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
      <router-link to="/sign_in" class="white--text">Signin</router-link>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
      <!-- <Header /> -->
    <!-- </v-app-bar> -->

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
// import Header from './components/Header.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
  },

  data: () => ({
    drawer: null,
    user: []
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
