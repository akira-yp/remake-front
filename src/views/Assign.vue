<template>
  <div>

    <div v-if="isStatus">
      <v-container>
        <v-row justify="center" class="pa-2">
            <v-avatar>
              <v-img
              :src="owner_avatar"
              ></v-img>
            </v-avatar>
            <v-avatar>
              <v-icon>mdi-arrow-right-bold-circle</v-icon>
            </v-avatar>
            <v-avatar>
              <v-icon>mdi-arrow-right-bold-circle</v-icon>
            </v-avatar>
            <v-avatar>
              <v-img
              :src="designer_avatar"
              ></v-img>
            </v-avatar>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-img
            :src="prevImages[getImgIndex]"
            class="rounded-xl"
            aspect-ratio="1"
            @click.stop="popupFigure(prevImages[getImgIndex])"
            ></v-img>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-avatar
          v-for="(img, i) in prevImages"
          :key="i"
          size="40"
          >
            <v-img :src="img"
              @click="changePreview(i)"
            ></v-img>
          </v-avatar>
        </v-row>
        <v-row>
          <v-col>
            <v-card outlined class="rounded-xl">
              <v-card-title>リメイクの依頼内容</v-card-title>
              <v-card-text>
              {{ assign.description }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-card flat>
            <v-container>
              <v-row justify-space-between no-gutters>
                <v-col cols="auto">
                  <v-card-title v-if="!editMode && this.assign.status === 0">
                  依頼額：¥{{ assign.budget }}
                  </v-card-title>
                  <v-text-field
                  v-else
                  type="number"
                  prefix="¥"
                  label="リメイクの予算"
                  min="300"
                  max="990000"
                  placeholder="300~990,000"
                  v-model.number="assign.budget"
                  outlined
                  fluid
                  color="remake_d"
                  rounded></v-text-field>
                </v-col>
                <v-col cols="auto" v-if="checkUserOwner">
                  <v-card-title v-if="!editMode">
                    <v-btn @click="toggleEditMode" rounded small>金額を変更</v-btn>
                  </v-card-title>
                  <v-card-title v-else>
                    <v-btn @click="updateAssign" rounded small>変更</v-btn>
                  </v-card-title>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-row>
        <v-row v-if="isDesigner">
          <v-col>
            <v-btn @click="acceptAssign" rounded>この内容で依頼を引き受ける</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>

        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <v-textarea
            label="相手へのメッセージ"
            v-model="chat.content"
            outlined
            rounded
            clearable
            hide-details="auto"
            color="remake_d"
            >
            </v-textarea>
          </v-col>
        </v-row>
        <v-row justify="end" no-gutters p-0>
          <v-badge
            v-if="prevChatFig !== null"
            overlap bottom color="rgba(0,0,0,0)"
            offset-x="25"
            offset-y="25"
          >
            <v-btn @click="deleteFig()" slot="badge" fab height="20" width="20">
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>
            <v-avatar class="ma-1" size="58">
              <v-img
                :src="prevChatFig"
                @click="popupFigure(prevChatFig)"
              ></v-img>
            </v-avatar>
          </v-badge>

            <label for="chat_file" class="ma-1 input_chat_file" :elevation="hover ? 24 : 6">
              <v-icon>mdi-camera</v-icon>
                <input
                type="file"
                id="chat_file"
                @change="setFig"
                style="display:none;"
                >
            </label>
          <v-btn @click="postChat" fab elevation="2" class="ma-1">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-row>
      </v-container>
      <v-container>
        <v-row
        v-for="(chat, index) in chats"
        :key="index"
        v-bind:class="{ 'flex-row-reverse': chat.userid === assign.owner_id }">
          <v-col>
            <v-card
            class="rounded-xl"
            >
              <v-img
                v-if="chat.figure_url !== null"
                :src="chat.figure_url"
                @click.stop="popupFigure(chat.figure_url)"
                aspect-ratio="1"
                max-height="200"
              ></v-img>
              <v-card-text v-if="chat.content !== ''">
                {{ chat.content }}
              </v-card-text>
            </v-card>

          </v-col>
          <v-col cols="auto">
            <v-card flat class="text-center">
              <v-avatar>
                <v-img v-if="chat.avatar !== null" :src="chat.avatar"></v-img>
                <v-icon v-else>mdi-account</v-icon>
              </v-avatar>
              <v-card-text class="pa-0">{{ chat.name }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
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

    <div v-else>
      <v-container>
        <v-row class="my-10" justify="center">
          <h2>リメイク依頼の作成</h2>
        </v-row>

        <v-row justify="center" class="mb-2">
          <h3>①依頼したい服の画像を選択してください</h3>
        </v-row>
        <v-row justify="center">
          <label for="input_file" class="assign_image">
            <v-icon color="white">mdi-camera</v-icon>
            <input
              type="file"
              label="アイテム画像"
              @change="onImageChange"
              multiple
              name="assign[images][]"
              id="input_file"
              style="display: none;"
            >
          </label>
        </v-row>
      </v-container>
      <v-layout class="d-flex flex-row justify-center" elevation="0">
        <v-col
          cols="auto"
          v-for="(image, index) in prevImages"
          v-bind:key="index"
        >
          <v-badge
            bottom overlap color="rgba(0,0,0,0)"
          >
            <v-btn @click="deleteImage(index)" slot="badge" fab height="20" width="20">
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>
            <v-avatar size="80" rounded>
              <v-img
              :src="image"
              max-height="100"
              max-width="100"
              aspect-ratio="1"
              ></v-img>
            </v-avatar>
          </v-badge>
        </v-col>
      </v-layout>
      <section></section>
      <v-container>
        <v-row justify="center">
          <h3>②依頼内容を入力</h3>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              outlined
              rounded
              label="リメイク依頼の詳細"
              v-model="assign.description"
              color="remake_d"
              hint="希望するリメイクの内容をデザイナーに伝えましょう。追加があれば作成後にデザイナーとチャットにて伝えることができます"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row justify="center">
          <h3>③デザイナーに提示する予算を入力</h3>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
            type="number"
            prefix="¥"
            label="リメイクの予算"
            min="300"
            max="990000"
            placeholder="300~990,000"
            v-model.number="assign.budget"
            outlined
            rounded
            color="remake_d"
            hint="おおよその予算を提示しましょう（後で変更できます）。半角数字で入力してください"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row justify="center">
          <v-btn
          rounded
          x-large
          color="accent"
          text-color="white"
          @click="createAssign"
          >この内容で依頼する</v-btn>
        </v-row>
      </v-container>
    </div>
    <section></section>
    <section></section>
    <div>
      <BackBtn @clickBackBtn="$router.back()" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import BackBtn from '../components/BackBtn.vue'
// import { getAuthDataFromStorage } from '../api/auth.js'

export default {
  name: 'Assign',
  components: {
    BackBtn
  },
  data: () => ({
    assign: {
      id: null,
      description: '',
      budget: null,
      status: null,
      owner_id: null,
      designer_id: null,
      images: []
    },
    owner_avatar: null,
    designer_avatar: null,
    prevImages: [],
    selectedImg: 0,
    editMode: true,
    dialog: false,
    chat: {
      userid: null,
      content: '',
      figure: null
    },
    chats: [],
    currentImage: null,
    prevChatFig: null
  }),
  created () {
    if (this.$route.query.id === undefined) {
      this.assign.owner_id = this.$route.query.owner_id
      this.assign.designer_id = this.$route.query.designer_id
    } else {
      this.fetchAssign(this.$route.query.id)
      this.editMode = false
      this.chat.userid = this.userId
    }
    window.scroll({ top: 0 })
  },
  computed: {
    ...mapGetters('user', ['userId', 'isAuthenticated']),
    getImgIndex () {
      return this.selectedImg
    },
    checkUserOwner () {
      return this.assign.owner_id === this.userId
    },
    isDesigner () {
      return this.assign.designer_id === this.userId
    },
    isStatus () {
      return this.assign.status === 0
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
    onImageChange (e) {
      const images = e.target.files
      for (var i = 0; i < images.length; i++) {
        this.assign.images.push(images[i])
        this.getBase64(images[i])
          .then(image => this.prevImages.push(image))
          .catch(error => this.setError(error, '画像のアップロードに失敗しました。'))
      }
    },
    deleteImage (i) {
      this.assign.images.splice(i, 1)
      this.prevImages.splice(i, 1)
    },
    async createAssign () {
      const assignData = new FormData()
      assignData.append('assign[description]', this.assign.description)
      assignData.append('assign[budget]', this.assign.budget)
      assignData.append('assign[status]', 0)
      assignData.append('assign[designer_id]', this.assign.designer_id)
      if (this.assign.images.length) {
        for (const image of this.assign.images) {
          assignData.append('assign[images]' + '[]', image)
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
      await axios.post('http://localhost:3000/v1/assigns', assignData, headers)
        .then(response => {
          this.$router.push({
            path: '/assign',
            query: {
              id: response.data.id
            }
          })
        })
        .catch(err => console.log(err))
      // this.fetchAssign(res.id)
      // this.chat.userid = this.userId
      // this.assign.status = res.status
    },
    async fetchAssign (id) {
      const assign = await axios.get(`http://localhost:3000/v1/assigns/${id}`)
        .then(response => response.data)
        .catch(err => console.log(err))
      this.prevImages = assign.images_url
      assign.imagesUrl = assign.images_url
      this.owner_avatar = assign.owner_avatar
      this.designer_avatar = assign.designer_avatar
      delete assign.images_url
      delete assign.owner_avatar
      delete assign.designer_avatar
      const { imagesUrl, ...newAssign } = assign
      this.assign = newAssign
      for (var index = 0; index < this.prevImages.length; index++) {
        await fetch(this.prevImages[index])
          .then(response => response.blob())
          .then(blob => new File([blob], `image${index}.png`))
          .then(file => {
            this.assign.images = []
            this.assign.images.push(file)
          })
      }
      this.chat.userid = this.userId
      this.fetchChats()
    },
    async updateAssign () {
      const updateData = new FormData()
      // updateData.append('assign[id]', this.assign.id)
      updateData.append('assign[description]', this.assign.description)
      updateData.append('assign[budget]', this.assign.budget)
      updateData.append('assign[status]', this.assign.status)
      updateData.append('assign[designer_id]', this.assign.designer_id)
      if (this.assign.images.length) {
        for (const image of this.assign.images) {
          updateData.append('assign[images]' + '[]', image)
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
      const newBudget = await axios
        .patch(`http://localhost:3000/v1/assigns/${this.assign.id}`, updateData, headers)
        .then(response => response.data)
        .catch(err => console.log(err))
      this.assign.budget = newBudget.budget
      this.editMode = false
    },
    async postChat () {
      const chatForm = new FormData()
      chatForm.append('chat[assign_id]', this.assign.id)
      chatForm.append('chat[content]', this.chat.content)
      if (this.chat.figure !== null) {
        chatForm.append('chat[figure]', this.chat.figure)
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
      await axios
        .post('http://localhost:3000/v1/chats', chatForm, headers)
        .then(response => {
          this.chats.unshift(response.data)
          this.chat.content = ''
          this.chat.figure = null
          this.prevChatFig = null
          this.chats.splice(0, 0)
        })
        .catch(err => console.log(err))
    },
    async fetchChats () {
      const assignParams = { params: { assign_id: this.assign.id } }
      await axios.get('http://localhost:3000/v1/chats', assignParams)
        .then(response => {
          this.chats = response.data
          console.log(response.data)
        })
        .catch(err => console.log(err))
    },
    acceptAssign () {
      this.assign.status = 1
      this.updateAssign()
    },
    async setFig (e) {
      const fig = e.target.files[0]
      this.chat.figure = fig
      await this.getBase64(fig)
        .then(prev => { this.prevChatFig = prev })
        .catch(err => console.log(err))
    },
    popupFigure (image) {
      this.currentImage = image
      this.dialog = true
    },
    deleteFig () {
      this.prevChatFig = null
      this.chat.figure = null
    },
    toggleEditMode () {
      this.editMode = !this.editMode
    },
    changePreview (i) {
      this.selectedImg = i
    }
  }
}
</script>

<style>
.assign_image {
  display:block;
  width:50px;
  height:50px;
  text-align: center;
  line-height: 50px;
  background:#DCEDC8;
  border-radius: 25px;
  color:white;
}
section {
  height: 50px;
}
.input_chat_file {
  display:block;
  width:58px;
  height:58px;
  text-align: center;
  line-height: 58px;
  background:#F5F5F5;
  border-radius: 50%;
  color:white;
  box-shadow: 0px 2px 2px 0px #D1D1D1;
}
</style>
