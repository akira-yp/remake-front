<template>
  <div>
    <div>
      <v-container>
        <v-row justify="center" class="pa-5">
          <h2>ログイン画面</h2>
        </v-row>
        <v-row>
          <p v-if="message !== ''">{{ message }}</p>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-form>
              <v-text-field
                label="e-mail"
                type="email"
                outlined
                fluid
                rounded
                color="remake_d"
                v-model="email"
              ></v-text-field>
              <v-text-field
                label="password"
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
          <v-btn @click="signIn" rounded color="remake_d" class="white--text">ログイン</v-btn>
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
          this.$router.push('/items')
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
        .then(this.setLocalStorage)
        .catch(err => console.log(err))
    },
    afterLogIn () {
      if (this.logedIn) {
        this.$router.push('/items')
      } else {
        this.message = 'Emailまたはパスワードが間違っています'
      }
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
  }
}
</script>

<style>
h2 {
  color:#97D61B;
}
</style>
