<template>
  <div>
    <h2>アイテム投稿画面</h2>
    <v-form>
      <v-text-field
      label="Item title"
      v-model="item.title"
      ></v-text-field>

      <input
        type="file"
        @change="onImageChange"
        multiple="multiple"
        name="item[images][]"
      >
      <v-card class="d-flex flex-row justify-center" elevation="0">
          <v-img
            v-for="(image, index) in encodedImages"
            v-bind:key="index"
            :src="image"
            max-height="100"
            max-width="100"
            aspect-ratio="1"
            class="ma-1 rounded-xl"
          ></v-img>
      </v-card>
      <v-text-field
      v-model="item.description"
      label="Description"
      ></v-text-field>
      <v-btn @click="upLoad" :disabled="item.title === ''">
        このアイテムを出品する
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'ItemCreate',
  data: () => ({
    encodedImages: [],
    item: {
      images: [],
      title: '',
      description: ''
    }
  }),
  methods: {
    ...mapActions('posts', ['createPost']),
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
        this.item.images.push(images[i])
        this.getBase64(images[i])
          .then(image => this.encodedImages.push(image))
          .catch(error => this.setError(error, '画像のアップロードに失敗しました。'))
      }
    },
    async upLoad () {
      const formData = new FormData()
      formData.append('item[title]', this.item.title)
      formData.append('item[description', this.item.description)
      if (this.item.images.length) {
        for (const image of this.item.images) {
          formData.append('item[images]' + '[]', image)
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
      const res = await axios.post('http://localhost:3000/v1/items', formData, headers)
        .then(response => response.data)
        .catch(err => console.log(err))
      // console.log(res)
      this.$router.push({
        path: '/item',
        query: {
          item: res
        }
      })
      // this.createPost(formData, headers)
    }
    // async createPost (data) {
    //   const headers = {
    //     headers:
    //       {
    //         uid: this.$store.state.user.uid,
    //         'access-token': this.$store.state.user.accessToken,
    //         client: this.$store.state.user.client,
    //         'content-Type': 'multipart/form-data'
    //       }
    //   }
    //   await axios.post('http://localhost:3000/v1/items', data, headers)
    //     .catch(e => console.log(e))
    // }
  }
}
</script>
