<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      app
    >
      <v-list dense>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <router-link to="/" >HOME</router-link>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-magnify</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <router-link to="/items">アイテムを探す</router-link>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="!logedIn">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <router-link to="/sign_in" >ログイン</router-link>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-upload</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <router-link to="/itemcreate" >アイテムを出品する</router-link>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="logedIn">
            <v-list-item-icon>
              <v-icon>mdi-account-edit</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <a @click="toPortfolio">ポートフォリオを編集する</a>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>
                mdi-human-greeting
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <router-link to="/designers">リメイクデザイナーを探す</router-link>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="logedIn">
            <v-list-item-icon>
              <v-icon>mdi-playlist-check</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <a @click="toMypage">マイページ</a>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="remake" v-if="!isTopPage">
      <v-app-bar-nav-icon @click="drawer = !drawer" color="white"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title class="navlogo">RemakeTree</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu class="position-absolute end-0">
        <template v-slot:activator="{ on, attrs }">
          <v-avatar
            color="white"
            size="48"
            v-bind="attrs"
            v-on="on"
          >
            <v-img v-if="logedIn" :src="getAvatar"></v-img>
            <span v-else><v-icon size="48" color="remake">mdi-account</v-icon></span>
          </v-avatar>
        </template>
          <v-card
            class="mx-auto"
            width="256"
            tile
          >
            <v-list dense>
              <v-list-item-group
              class="mx-auto"
              tile
              >
                <v-list-item v-if="logedIn">
                  <v-list-item-avatar size="48">
                    <v-img :src="getAvatar"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ user.name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider v-if="logedIn"></v-divider>
                <v-list-item v-if="logedIn">
                    <v-list-item-icon>
                      <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content @click="toMypage">
                      <v-list-item-title>マイページ</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="logedIn" @click="toPortfolio">
                  <v-list-item-icon>
                    <v-icon>mdi-account-edit</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>ポートフォリオを編集する</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="signOut" v-if="logedIn">
                  <v-list-item-icon>
                    <v-icon>mdi-logout</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>ログアウト</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="toSignIn" v-if="!logedIn">
                  <v-list-item-icon>
                    <v-icon>mdi-login</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>ログイン</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="toSignupPageAsUser" v-if="!logedIn">
                  <v-list-item-icon>
                    <v-icon>mdi-account-plus</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>アカウント作成</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
      </v-menu>
      <!-- <v-avatar v-else size="36" color="remake"></v-avatar> -->
      <!-- <v-btn v-if="logedIn" depressed @click="signOut">ログアウト</v-btn> -->
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
    this.userid = this.userId
  },
  computed: {
    ...mapGetters('user', ['user', 'userId', 'getAvatar', 'isAuthenticated']),
    logedIn () {
      return this.isAuthenticated
    },
    userChars () {
      return this.user.name.slice(0, 2).toUpperCase()
    },
    isTopPage () {
      return this.$route.path === '/'
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
        accessToken: this.user.accessToken,
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
    },
    toMypage () {
      this.$router.push({
        path: '/mypage',
        query: {
          id: this.userId
        }
      })
    },
    toHome () {
      this.$router.push({ path: '/' })
    },
    toSignIn () {
      this.$router.push({ path: '/sign_in' })
    },
    toSignupPageAsUser () {
      this.$router.push({ path: '/sign_up' })
    },
    setAvatar () {
      return this.getAvatar
    }
  }
}
</script>

<style>
 .navlogo {
   color: white;
 }

 a {
  text-decoration: none;
  color: #212121 !important;
 }
</style>
