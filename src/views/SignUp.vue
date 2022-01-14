<template>
  <div>
    <!-- <v-btn @click="toggleDesigner()"></v-btn> -->
    <div>
      <v-container>
        <v-row justify="center" class="pa-5">
          <h2>{{ setTitle }}</h2>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-form>
              <v-text-field
                label="name"
                v-model="name"
                fluid
                rounded
                outlined
                color="remake"
              ></v-text-field>
              <v-text-field
                label="e-mail"
                type="email"
                v-model="email"
                fluid
                rounded
                outlined
                color="remake"
              ></v-text-field>
              <v-text-field
                label="password"
                type="password"
                v-model="password"
                fluid
                rounded
                outlined
                color="remake"
              ></v-text-field>
            </v-form>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn
            v-if="designer"
            @click="signUp"
            rounded
            color="remake_d"
            class="white--text"
          >デザイナー登録する</v-btn>
          <v-btn
            v-else
            @click="signUp"
            rounded
            color="remake_d"
            class="white--text"
          >アカウント登録する</v-btn>
        </v-row>
      </v-container>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SignUp',
  data: () => ({
    name: '',
    email: '',
    password: '',
    designer: null
  }),
  created () {
    this.$route.query.designer === 'true' ? this.designer = true : this.designer = false
  },
  computed: {
    // ...mapGetters('user', ['isAuthenticated']),
    setTitle () {
      if (this.designer === true) {
        return 'デザイナー登録'
      } else {
        return 'アカウント登録'
      }
    }
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
    },
    async updateUser () {
      const formData = new FormData()
      formData.append('name', this.name)
      formData.append('email', this.email)
      formData.append('password', this)
    }
  }
}
</script>

<style>

</style>
