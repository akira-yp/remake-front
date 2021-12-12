<template>
  <div>
    <!-- <div v-if="client === ''">
      <h1>Sign Up</h1>
      <label for="name">name</label>
      <input id="name" type="text" v-model="name" />
      <label for="email">email</label>
      <input id="email" type="email" v-model="email" />
      <label for="password">password</label>
      <input id="password" type="password" v-model="password" />
      <button @click="signUp">アカウント登録</button>
    </div> -->
    <div>
        <h1>SignIn</h1>
        <label for="email">email</label>
        <input id="email" type="email" v-model="email" />
        <label for="password">password</label>
        <input id="password" type="password" v-model="password" />
        <button @click="signIn">ログイン</button>
    </div>
    <div>
      <!-- <button @click="signOut">ログアウト</button> -->
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'SignIn',
  data: () => ({
    email: '',
    password: '',
    client: ''
  }),
  computed: {
    ...mapGetters('user', ['user', 'isAuthenticated']),
    logedIn () {
      return this.isAuthenticated
    }
  },
  mounted () {
    this.$store.watch(
      () => this.isAuthenticated,
      (newValue, oldValue) => {
        if (newValue === true) {
          this.$router.push('/about')
        } else {
          console.log(false)
        }
      }
    )
  },
  methods: {
    ...mapActions('user', ['authUser']),
    signIn () {
      const params = {
        email: this.email,
        password: this.password
      }
      this.authUser(params)
      this.$router.push('/about')
    }
    // setLocalStorage () {
    //   localStorage.setItem('headers', JSON.stringify({
    //     accessToken: this.user['acccess-token'],
    //     client: this.user.client,
    //     uid: this.user.uid
    //   }))
    // }
    // signOut () {
    //   const logoutParams = {
    //     headers: {
    //       uid: this.$store.state.user.uid,
    //       'access-token': this.$store.state.user.accessToken,
    //       client: this.$store.state.user.client
    //     }
    //   }
    //   this.deleteSession(logoutParams)
    //   console.log(this.isAuthenticated)
    // }
  }
}
</script>
