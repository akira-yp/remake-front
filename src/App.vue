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
          <router-link to="/items">アイテムを探す</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/about">About</router-link>
        </v-list-item>
        <v-list-item v-if="logedIn == false">
          <router-link to="/sign_in" >ログイン</router-link>
        </v-list-item>
        <v-list-item v-if="logedIn == false">
          <router-link to="/sign_up">アカウント登録</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/itemcreate" >アイテムを出品する</router-link>
        </v-list-item>
        <v-list-item>
          <a @click="toPortfolio">ポートフォリオ</a>
        </v-list-item>
        <v-list-item>
          <router-link to="/designers">リメイクデザイナーを探す</router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>RemakeTree</v-toolbar-title>
      <v-btn v-if="logedIn" depressed @click="signOut">ログアウト</v-btn>
    </v-app-bar>

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
    userid: null
  }),
  created () {
    if (this.$store.state.user.client === null) {
      const localData = JSON.parse(localStorage.getItem('headers'))
      this.setAuthToStore(localData)
    }
    this.userid = this.user.id
    console.log(this.user.id)
  },
  computed: {
    ...mapGetters('user', ['user', 'isAuthenticated']),
    logedIn () {
      return this.isAuthenticated
    }
  },
  methods: {
    ...mapActions('user', ['deleteSession', 'setAuthToStore']),
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
    setLocalStorage () {
      localStorage.setItem('headers', JSON.stringify({
        accessToken: this.user['acccess-token'],
        client: this.user.client,
        uid: this.user.uid,
        id: this.user.id,
        designer: this.user.designer,
        name: this.user.name,
        expiry: this.user.expiry
      }))
    },
    toPortfolio () {
      this.$router.push({
        path: '/portfolio',
        query: {
          id: this.user.id
        }
      })
    }
    // getUserId () {
    //   this.data.userid = this.$store.state.user.id
    //   console.log(this)
    // }
    // setAuthToStore () {
    //   const localItems = localStorage.getItem('headers')
    //   console.log(localItems)
    //   this.user['access-token'] = localItems.accessToken
    //   this.user.client = localItems.client
    //   this.user.client = localItems.uid
    // }
  }
}
</script>
