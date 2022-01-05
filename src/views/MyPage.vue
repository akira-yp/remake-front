<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          v-for="(item, index) in assignItems"
          :key="index"
          cols="6"
        >
          <v-card @click="showAssign(item.id)" class="rounded-xl">
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
import { mapGetters } from 'vuex'
// import { getAuthDataFromStorage } from '../api/auth.js'

export default {
  name: 'MyPage',
  data: () => ({
    assignItems: {},
    assignedItems: {},
    postedItems: {}
  }),
  created () {
    this.fetchAssignItems()
  },
  computed: {
    ...mapGetters('user', ['userId', 'isAuthenticated'])
  },
  methods: {
    async fetchAssignItems () {
      const res = await axios.get('http://localhost:3000/v1/assigns', { params: { owner_id: this.userId } })
        .then(response => response.data)
        .catch(err => console.log(err))
      this.assignItems = res
    },
    showAssign (id) {
      this.$router.push({
        path: '/assign',
        query: {
          id: id
        }
      })
    }
  }
}
</script>
