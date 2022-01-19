<template>
  <div>
    <div>
      <v-container>
        <v-row justify="center" class="pa-10">
          <h2>ログイン画面</h2>
        </v-row>
        <v-row>
          <p v-if="message !== ''">{{ message }}</p>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <v-form>
              <v-text-field
                label="E-mail"
                type="email"
                outlined
                fluid
                rounded
                color="remake_d"
                v-model="email"
              ></v-text-field>
              <v-text-field
                label="パスワード"
                type="password"
                outlined
                fluid
                rounded
                color="remake_d"
                v-model="password"
              ></v-text-field>
            </v-form>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <v-btn
            @click="signIn"
            rounded
            block
            x-large
            color="remake"
            >
              <h2 class="white--text">ログイン</h2>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
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
    ...mapGetters('user', ['user', 'userId', 'isAuthenticated']),
    logedIn () {
      return this.isAuthenticated
    }
  },
  mounted () {
    this.$store.watch(
      () => this.isAuthenticated,
      (newValue, oldValue) => {
        if (newValue === true) {
          this.fetchAvatar(this.userId)
          this.setLocalStorage()
          this.$router.push('/items')
        } else {
          console.log(false)
        }
      }
    )
  },
  methods: {
    ...mapActions('user', ['authUser', 'fetchAvatar']),
    async signIn () {
      const params = {
        email: this.email,
        password: this.password
      }
      this.authUser(params)
      // .then(() => {
      //   console.log(this.userId)
      // })
      // .catch(err => console.log(err))
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
    }
    // afterLogIn () {
    //   if (this.logedIn) {
    //     this.$router.push('/items')
    //   } else {
    //     this.message = 'Emailまたはパスワードが間違っています'
    //   }
    // }
    // setLocalStorage () {
    //   localStorage.setItem('headers', JSON.stringify({
    //     accessToken: this.user.accessToken,
    //     client: this.user.client,
    //     uid: this.user.uid,
    //     id: this.user.id,
    //     designer: this.user.designer,
    //     name: this.user.name,
    //     expiry: this.user.expiry
    //   }))
    // }
  }
}
</script>

<style>
h2 {
  color:#97D61B;
}
</style>
