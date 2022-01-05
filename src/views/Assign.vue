<template>
  <div>
    <div v-if="assign.status === null">
      <h2>リメイク依頼</h2>
      <input
        type="file"
        label="アイテム画像"
        @change="onImageChange"
        multiple
        name="assign[images][]"
      >
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
      <v-container>
        <v-row>
          <v-col>
            <v-textarea
              outlined
              rounded
              label="リメイク依頼の詳細"
              v-model="assign.description"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
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
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row justify="center">
          <v-btn
          rounded
          @click="createAssign"
          >この内容で依頼する</v-btn>
        </v-row>
      </v-container>
    </div>

    <div else>
      <p>{{ assign.description }}</p>
      <v-img
      :src="prevImages[0]"
      ></v-img>
      <p>{{ assign.budget }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'Assign',
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
    prevImages: [],
    editMode: true
  }),
  created () {
    if (this.$route.query.id === undefined) {
      this.assign.owner_id = this.$route.query.owner_id
      this.assign.designer_id = this.$route.query.designer_id
    } else {
      this.fetchAssign(this.$route.query.id)
      this.editMode = false
    }
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated'])
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
      const res = await axios.post('http://localhost:3000/v1/assigns', assignData, headers)
        .then(response => response.data)
        .catch(err => console.log(err))
      console.log(res)
    },
    async fetchAssign (id) {
      const assign = await axios.get(`http://localhost:3000/v1/assigns/${id}`)
        .then(response => response.data)
        .catch(err => console.log(err))
      console.log(assign)
      this.prevImages = assign.images_url
      assign.imagesUrl = assign.images_url
      delete assign.images_url
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
    }
  }
}
</script>
