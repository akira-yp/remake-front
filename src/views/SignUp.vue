<template>
  <div>
    <h1>アカウント登録</h1>
    <v-form>
      <v-text-field
        label="name"
        v-model="name"
      ></v-text-field>
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
        @click="signUp"
      >アカウントを登録する</v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'SignUp',
  data: () => ({
    name: '',
    email: '',
    password: '',
    designer: false
  }),
  created () {
    if (this.isAuthenticated()) {
      this.$router.push('/items')
    }
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('user', ['createUser', 'authUser']),
    async signUp () {
      const formData = new FormData()
      formData.append('name', this.name)
      formData.append('email', this.email)
      formData.append('password', this.password)
      formData.append('designer', this.designer)
      await this.createUser(formData)
        .then(response => this.authUser(response.data))
        .catch(error => console.log(error))
    }
  }

}
</script>

<style>

</style>
