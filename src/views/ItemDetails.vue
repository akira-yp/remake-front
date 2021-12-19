<template>
  <div>
    <h1>{{ item.title }}</h1>
    <v-img
      :aspect-ratio="1/1"
      v-for="(image, index) in item.images_url"
      v-bind:key="index"
      :src="image"
    ></v-img>
    <p>{{ item.description }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import { getAuthDataFromStorage } from '../api/auth.js'

export default {
  name: 'ItemDetails',
  data: () => ({
    item: {
      title: '',
      images: [],
      description: ''
    }
  }),
  created () {
    this.item = { ...this.$route.query.item }
  },
  methods: {
    async fetchItem (id) {
      await axios.get('http://localhost:3000/v1/items', { id: id }, { headers: getAuthDataFromStorage() })
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style>

</style>
