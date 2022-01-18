<template>
  <div>
    <v-container>
      <v-row justify-space-between class="pa-3">
        <v-flex>
          <h2 v-if="!isEditMode">プロフィール</h2>
          <h2 v-else>プロフィールを作成しよう</h2>
        </v-flex>
        <v-flex shrink>
          <v-btn
          v-if="isCurrentUser"
          @click="toggleEditMode"
          rounded
          >{{ editBtn }}</v-btn>
        </v-flex>
      </v-row>
    </v-container>

    <div v-if="!isEditMode">
      <v-container>
        <v-row>
          <v-chip v-if="profile.orderable" class="ma-2" color="orange" text-color="white">リメイク依頼受け付け中です</v-chip>
        </v-row>
        <v-row justify="start">
          <v-card flat>
            <v-list>
              <v-list-item-group>
                <v-list-item>
                  <v-list-item-avatar size="60">
                    <v-img
                    v-if="prevAvatar !== null"
                    :src="prevAvatar"
                    ></v-img>
                    <v-icon
                    size="100"
                    v-else
                    >mdi-account</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ profile.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ profile.greeting }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-row>
      </v-container>
      <v-container>
        <v-row justify="center">
          <v-card flat>
            <v-card-text>{{ profile.description }}</v-card-text>
          </v-card>
        </v-row>
        <v-row justify="center">
          <v-card width="95%" rounded flat>
            <v-card-title>ポートフォリオ</v-card-title>
              <v-container>
                <v-row>
                  <v-col
                  v-for="(work, index) in prevWorks"
                  v-bind:key="index"
                  cols="6"
                  >
                    <v-img
                    :src="work"
                    class="rounded-xl"
                    aspect-ratio="1"
                    @click="popupFigure(work)"
                    ></v-img>
                  </v-col>
                </v-row>
              </v-container>
          </v-card>
        </v-row>
      </v-container>
      <v-layout v-if="logedIn && !isCurrentUser && profile.orderable" justify-center ma-5>
        <v-btn
        @click="toAssign"
        rounded
        x-large
        class="accent font-weight-bold"
        >{{ profile.name }}さんにリメイクを依頼する</v-btn>
      </v-layout>
      <section></section>
    </div>

    <div v-if="isEditMode">
      <v-container>
        <v-row justify="center">
          <h3>プロフィール画像を登録</h3>
        </v-row>
        <v-row justify="center" class="mb-10">
          <v-col cols="4">
            <label for="change_avatar" class="select_file" >
              <v-icon color="white">mdi-plus</v-icon>
              <input
              type="file"
              label="プロフィール写真"
              @change="onAvatarChange"
              name="profile[avatar]"
              id="change_avatar"
              style="display:none;"
              >
            </label>
          </v-col>
          <v-col cols="4">
            <v-avatar size="100">
              <v-img
                :src="prevAvatar"
              ></v-img>
            </v-avatar>
          </v-col>
        </v-row>

        <v-row justify="center">
          <h3>自己紹介/挨拶</h3>
        </v-row>
        <v-row justify="center">
          <v-col cols="11">
            <v-textarea
            label="自己紹介"
            v-model="profile.greeting"
            rounded
            outlined
            color="remake_d"
            clearable
            hint="簡単なプロフィールなどを入力しましょう。一覧画面などで表示されます"
            >
            </v-textarea>
          </v-col>
        </v-row>
        <v-row justify="center" class="mb-10">
          <v-col cols="11">
            <v-textarea
            label="PR/リメイクについて"
            v-model="profile.description"
            rounded
            outlined
            clearable
            color="remake_d"
            hint="リメイクする際の金額や納品までの期間なども伝えておきましょう"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row class="mb-10" justify="center">
          <h3>リメイク依頼を受け付けますか？</h3>
        </v-row>
        <v-row justify="center" class="mb-10">
          <v-btn @click="toggleOrderable" rounded x-large class="ma-1" v-bind:class="{ btnon: !isOrderable, btnoff: isOrderable }">今は受け付けない</v-btn>
          <v-btn @click="toggleOrderable" rounded x-large class="ma-1" v-bind:class="{ btnon: isOrderable, btnoff: !isOrderable }">受け付ける</v-btn>
        </v-row>

        <v-row justify="center">
          <h3>ポートフォリオ画像を追加する</h3>
        </v-row>
        <v-row justify="center">
          <label for="input_portfolio" class="portfolio">
            <v-icon color="white">mdi-plus</v-icon>
            <input
            type="file"
            label="ポートフォリオ画像"
            @change="onWorksChange"
            multiple
            name="profile[works][]"
            id="input_portfolio"
            style="display:none;"
            >
          </label>
        </v-row>
        <v-row justify="start">
          <v-col
            cols="4"
            v-for="(work, index) in prevWorks"
            v-bind:key="index"
          >
            <v-badge
              bottom overlap color="rgba(0,0,0,0)"
            >
              <v-btn @click="deleteWork(index)" slot="badge" fab height="20" width="20">
                <v-icon>mdi-close-circle</v-icon>
              </v-btn>
              <v-avatar size="100" class="rounded-xl">
                <v-img
                :src="work"
                aspect-ratio="1"
              ></v-img>
              </v-avatar>
            </v-badge>
          </v-col>
        </v-row>
        <v-row justify="center">

        </v-row>
        <v-row justify="center">
          <v-btn
          @click="createProfile"
          :disabled="profile.greeting === ''"
          rounded
          x-large
          color="accent"
          class="my-10 white--text"
          >
            プロフィールを登録する
          </v-btn>
        </v-row>
      </v-container>
    </div>
    <div>
      <BackBtn @clickBackBtn="$router.back()" />
    </div>
    <section></section>
    <v-dialog v-model="dialog" fullscreen>
      <v-card ma-0>
        <v-img :src="currentImage">
        </v-img>
        <v-card-actions>
          <v-btn @click="dialog = false" fab small>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import BackBtn from '../components/BackBtn.vue'
export default {
  name: 'Portfolio',
  components: {
    BackBtn
  },
  data: () => ({
    profile: {
      name: '',
      avatar: '',
      greeting: '',
      description: '',
      orderable: false,
      works: [],
      id: null,
      user_id: null
    },
    prevAvatar: '',
    prevWorks: [],
    isEditMode: false,
    editBtn: '編集する',
    dialog: false,
    currentImage: null
  }),
  created () {
    this.fetchProfile(this.$route.query.id)
    window.scroll({ top: 0 })
  },
  computed: {
    ...mapGetters('user', ['userId', 'isAuthenticated']),
    logedIn () {
      return this.isAuthenticated
    },
    isCurrentUser () {
      return this.$store.state.user.id === Number(this.profile.user_id)
    },
    isOrderable () {
      return this.profile.orderable
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
      formData.append('profile[orderable]', this.profile.orderable)
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
      this.profile.orderable = res.orderable
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
      this.profile.name = prof.name
      this.profile.description = prof.description
      this.profile.greeting = prof.greeting
      this.profile.orderable = prof.orderable
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
    },
    toggleOrderable () {
      this.profile.orderable = !this.profile.orderable
    },
    popupFigure (image) {
      this.currentImage = image
      this.dialog = true
    }
  }
}
</script>

<style>
.select_file {
  display:block;
  width:100px;
  height:100px;
  text-align: center;
  line-height: 100px;
  background:#DCEDC8;
  border-radius: 50px;
}
.portfolio {
  display:block;
  width:50px;
  height:50px;
  text-align: center;
  line-height: 50px;
  background:#DCEDC8;
  border-radius: 25px;
  color:white;
}
.btnon {
  background:#689F38 !important;
  color: white !important;
  font-weight: bold;
}
.btnoff {
  background: #DCEDC8 !important;
  color: white !important;
}
h3 {
  color: #757575;
}
section {
  height:200px;
}
</style>
