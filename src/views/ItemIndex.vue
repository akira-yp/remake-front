<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col>
          <v-text-field
            outlined
            rounded
            color="remake_d"
            prepend-inner-icon="mdi-magnify"
            class="mt-3"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="(item, index) in items"
          :key="index"
          cols="6"
        >
          <v-card @click="showItem(item.id)" class="rounded-xl">
            <v-responsive :aspect-ratio="1/1">
              <v-img
               :aspect-ratio="1/1"
               :src="item.images_url[0]"
              ></v-img>
            </v-responsive>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ItemIndex',
  data: () => ({
  }),
  created () {
    this.fetchItems()
  },
  computed: {
    ...mapGetters('items', ['items'])
  },
  methods: {
    ...mapActions('items', ['fetchItems']),
    async showItem (id) {
      await axios.get(`http://localhost:3000/v1/items/${id}`)
        .then(res => this.$router.push({
          path: '/item',
          query: {
            id: res.data.id
          }
        }))
    }
  }

}
</script>
