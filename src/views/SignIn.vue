<template>
  <div>
    <div>
        <h1>SignIn</h1>
        <p v-if="message !== ''">{{ message }}</p>
        <v-form>
          <v-text-field
            label="e-mail"
            type="email"
            v-model="email"
          ></v-text-field>
          <v-text-field
            label="password"
            type="password"
            v-model="password"
          ></v-text-field>
          <v-btn
            @click="signIn"
          >ログイン</v-btn>
        </v-form>
        <!-- <label for="email">email</label>
        <input id="email" type="email" v-model="email" />
        <label for="password">password</label>
        <input id="password" type="password" v-model="password" />
        <button @click="signIn">ログイン</button> -->
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
    client: '',
    message: ''
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
    async signIn () {
      const params = {
        email: this.email,
        password: this.password
      }
      await this.authUser(params)
        .then(this.afterLogIn)
    },
    afterLogIn () {
      if (this.logedIn) {
        this.$router.push('/items')
      } else {
        this.message = 'Emailまたはパスワードが間違っています'
      }
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
