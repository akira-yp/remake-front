<template>
  <div>
    <!-- <v-btn @click="toggleDesigner()"></v-btn> -->
    <div>
      <v-container>
        <v-row justify="center" class="pa-5">
          <h1>{{ setTitle }}</h1>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <h3>{{ setMessage }}</h3>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <v-form>
              <v-text-field
                label="お名前"
                v-model="name"
                fluid
                rounded
                outlined
                color="remake"
              ></v-text-field>
              <v-text-field
                label="E-mail"
                type="email"
                v-model="email"
                fluid
                rounded
                outlined
                color="remake"
              ></v-text-field>
              <v-text-field
                label="パスワード"
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
          <v-col cols="10">
            <v-btn
            @click="signUp"
            rounded
            block
            x-large
            color="remake"
            class="white--text"
            >
              <h1 class="white--text">登録する</h1>
            </v-btn>
          </v-col>
        </v-row>
        <section></section>
        <v-row justify="center" v-if="!designer">
          <v-btn
          color="remake"
          text
          @click="toSignUpPageAsDesigner"
          >
            <h2 class="as_link">デザイナーとして登録する</h2>
          </v-btn>
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
    },
    setMessage () {
      if (this.designer === true) {
        return 'リメイクデザイナーとしてご利用するお客様は、こちらからご登録ください。'
      } else {
        return '新規ご利用のお客様は、こちらからご登録ください。'
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
    },
    toSignUpPageAsDesigner () {
      this.designer = true
    }
  }
}
</script>

<style>
.as_link {
  text-decoration: underline;
  color: #57d26a;
}
</style>
