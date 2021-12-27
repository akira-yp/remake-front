<template>
  <div>
    <h1>Portfolio</h1>
    <v-form>
      <v-text-field
      label="greeting"
      v-model="profile.greeting"
      ></v-text-field>

      <input
        type="file"
        label="プロフィール写真"
        @change="onAvatarChange"
        name="profile[avatar]"
      >
      <v-card class="d-flex flex-row justify-center" elevation="0">
        <v-img
          :src="prevAvatar"
          max-height="100"
          max-width="100"
          aspect-ratio="1"
          class="rounded-circle"
        ></v-img>
      </v-card>
      <v-text-field
        label="description"
        v-model="profile.description"
      ></v-text-field>

      <input
        type="file"
        label="ポートフォリオ画像"
        @change="onWorksChange"
        multiple
        name="profile[works][]"
      >

      <v-card class="d-flex flex-row justify-center" elevation="0">
          <v-img
            v-for="(work, index) in prevWorks"
            v-bind:key="index"
            :src="work"
            max-height="100"
            max-width="100"
            aspect-ratio="1"
            class="ma-1 rounded-xl"
          ></v-img>
      </v-card>
      <v-btn @click="createProfile" :disabled="profile.greeting === ''">
        このプロフィールを作成
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Portfolio',
  data: () => ({
    profile: {
      avatar: '',
      greeting: '',
      description: '',
      works: []
    },
    prevAvatar: '',
    prevWorks: []
  }),
  methods: {
    getBase64 (file) {
      // const reader = new FileReader()
      // reader.readAsDataURL(file)
      // reader.onload = () => {
      //   return reader.result
      // }
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    onWorksChange (e) {
      const works = e.target.files
      for (var i = 0; i < works.length; i++) {
        this.profile.works.push(works[i])
        this.getBase64(works[i])
          .then(work => this.prevWorks.push(work))
          .catch(error => this.setError(error, '画像のアップロードに失敗しました。'))
      }
    },
    async onAvatarChange (e) {
      const avatar = e.target.files[0]
      this.profile.avatar = avatar
      // console.log(this.getBase64(avatar))
      this.prevAvatar = await this.getBase64(avatar)
        .then(image => image)
        .catch(error => console.log(error))
      // .then(image => image )
      // .catch(error => this.setError(error, '画像のアップロードに失敗しました。'))
    },
    async createProfile () {
      const formData = new FormData()
      formData.append('profile[greeting]', this.profile.greeting)
      formData.append('profile[description]', this.profile.description)
      formData.append('profile[avatar]', this.profile.avatar)
      if (this.profile.works.length) {
        for (const work of this.profile.works) {
          formData.append('profile[works]' + '[]', work)
        }
      }
      const headers = {
        headers:
          {
            uid: this.$store.state.user.uid,
            'access-token': this.$store.state.user.accessToken,
            client: this.$store.state.user.client,
            'content-Type': 'multipart/form-data'
          }
      }
      const res = await axios.post('http://localhost:3000/v1/profiles', formData, headers)
        .then(response => response.data)
        .catch(err => console.log(err))
      this.$router.push({
        path: '/portfolio',
        query: {
          portfolio: res
        }
      })
    }
  }
}
</script>

<style>

</style>
