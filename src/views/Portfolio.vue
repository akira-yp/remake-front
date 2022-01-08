<template>
  <div>
    <v-container>
      <v-layout justify-space-between>
        <v-flex>
          <h1>Portfolio</h1>
        </v-flex>
        <v-flex shrink>
          <v-btn v-if="isCurrentUser" @click="toggleEditMode" rounded>{{ editBtn }}</v-btn>
        </v-flex>
      </v-layout>
    </v-container>

    <div v-if="!isEditMode">
      <v-layout justify-center>
        <v-card width="70%">
          <v-layout justify-center mt-3>
            <v-img
            v-if="prevAvatar !== null"
            :src="prevAvatar"
            max-height="100"
            max-width="100"
            aspect-ratio="1"
            class="rounded-circle"
            ></v-img>
            <v-icon
            size="100"
            v-else
            >mdi-account</v-icon>
          </v-layout>
          <v-card-text>
            <p>{{ profile.greeting }}</p>
          </v-card-text>
        </v-card>
      </v-layout>
      <v-layout>
        <v-card flat>
          <v-card-text>{{ profile.description }}</v-card-text>
        </v-card>
      </v-layout>
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
      <v-layout v-if="logedIn && !isCurrentUser" justify-center ma-5>
        <v-btn @click="toAssign" rounded>リメイクを依頼する</v-btn>
      </v-layout>

    </div>

    <div d-flex flex-row justify-center>
      <v-form v-if="isEditMode">
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

        <v-layout class="d-flex flex-row justify-center" elevation="0">
              <v-col
                cols="auto"
                v-for="(work, index) in prevWorks"
                v-bind:key="index"
              >
                <v-badge
                  bottom overlap color="rgba(0,0,0,0)"
                >
                  <v-btn @click="deleteWork(index)" slot="badge" fab height="20" width="20">
                    <v-icon>mdi-close-circle</v-icon>
                  </v-btn>
                  <v-avatar size="80" rounded>
                    <v-img
                    :src="work"
                    max-height="100"
                    max-width="100"
                    aspect-ratio="1"
                  ></v-img>
                  </v-avatar>
                </v-badge>
              </v-col>
        </v-layout>
        <v-layout class="d-flex flex-row justify-center">
          <v-btn @click="createProfile" :disabled="profile.greeting === ''" rounded>
            ポートフォリオを保存
          </v-btn>
        </v-layout>
      </v-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  name: 'Portfolio',
  data: () => ({
    profile: {
      avatar: '',
      greeting: '',
      description: '',
      works: [],
      id: null,
      user_id: null
    },
    prevAvatar: '',
    prevWorks: [],
    isEditMode: false,
    editBtn: '編集する'
  }),
  created () {
    this.fetchProfile(this.$route.query.id)
  },
  computed: {
    ...mapGetters('user', ['userId', 'isAuthenticated']),
    logedIn () {
      return this.isAuthenticated
    },
    isCurrentUser () {
      return this.$store.state.user.id === Number(this.profile.user_id)
    }
  },
  methods: {
    getBase64 (file) {
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
      this.prevAvatar = await this.getBase64(avatar)
        .then(image => image)
        .catch(error => console.log(error))
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
      const res = await axios
        .patch(`http://localhost:3000/v1/profiles/${this.profile.id}`, formData, headers)
        .then(response => response.data)
        .catch(err => console.log(err))
      this.profile.description = res.description
      this.profile.greeting = res.greeting
      this.profile.id = res.id
      this.profile.user_id = res.user_id
      this.prevAvatar = res.avatar_url
      this.prevWorks = res.works_url
      this.profile.avatar = await fetch(res.avatar_url)
        .then(response => response.blob())
        .then(blob => new File([blob], `${res.user_id}_avatar.png`))
      // prof.works_urlからファイルデータを生成してprofile.worksに入れる
      for (var i = 0; i < res.works_url.length; i++) {
        await fetch(res.works_url[i])
          .then(response => response.blob())
          .then(blob => new File([blob], `work_image${i}.png`))
          .then(file => {
            this.profile.works.push(file)
          })
      }
      this.toggleEditMode()
    },
    async fetchProfile (userId) {
      const prof = await axios
        .get(`http://localhost:3000/v1/profiles/${userId}`)
        .then(response => response.data)
        .catch(err => console.log(err))
      this.profile.description = prof.description
      this.profile.greeting = prof.greeting
      this.profile.id = prof.id
      this.profile.user_id = prof.user_id
      this.prevAvatar = prof.avatar_url
      this.prevWorks = prof.works_url
      this.profile.avatar = await fetch(prof.avatar_url)
        .then(response => response.blob())
        .then(blob => new File([blob], `${prof.user_id}_avatar.png`))
      // prof.works_urlからファイルデータを生成してprofile.worksに入れる
      for (var index = 0; index < prof.works_url.length; index++) {
        await fetch(prof.works_url[index])
          .then(response => response.blob())
          .then(blob => new File([blob], `work_image${index}.png`))
          .then(file => {
            this.profile.works.push(file)
          })
      }
    },
    deleteWork (i) {
      this.profile.works.splice(i, 1)
      this.prevWorks.splice(i, 1)
    },
    toggleEditMode () {
      if (this.isEditMode) {
        this.isEditMode = false
        this.editBtn = '編集する'
      } else {
        this.isEditMode = true
        this.editBtn = '戻る'
      }
    },
    async toAssign () {
      this.$router.push({
        path: '/assign',
        query: {
          owner_id: this.userId,
          designer_id: this.profile.user_id
        }
      })
    }
  }
}
</script>

<style>

</style>
