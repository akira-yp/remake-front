<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h1>{{ item.title }}</h1>
          <v-img
            :aspect-ratio="1/1"
            v-for="(image, index) in item.images_url"
            v-bind:key="index"
            :src="image"
          ></v-img>
          <p>{{ item.description }}</p>
        </v-col>
      </v-row>
    </v-container>
    <div>
      <BackBtn @clickBackBtn="$router.back()" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import { getAuthDataFromStorage } from '../api/auth.js'
import BackBtn from '../components/BackBtn.vue'

export default {
  name: 'ItemDetails',
  components: {
    BackBtn
  },
  data: () => ({
    item: {
      title: '',
      images: [],
      description: '',
      id: null
    }
  }),
  created () {
    this.fetchItem(this.$route.query.id)
  },
  methods: {
    async fetchItem (id) {
      await axios.get(`http://localhost:3000/v1/items/${id}`)
        .then(response => {
          this.item = response.data
        })
        .catch(err => console.log(err))
    }
  }
  // toPageBack () {
  //   this.$router.back()
  // }
}
</script>

<style>

</style>
