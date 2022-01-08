<template>
  <div>
    <v-container v-if="checkUserRoll">
      <v-row>
        <h2>リメイク案件一覧</h2>
      </v-row>
      <v-row>
        <v-col
          v-for="(item, index) in assignedItems"
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
    <v-container>
      <v-row>
        <h2>リメイク依頼したアイテム一覧</h2>
      </v-row>
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
import { getAuthDataFromStorage } from '../api/auth.js'

export default {
  name: 'MyPage',
  data: () => ({
    assignItems: {},
    assignedItems: {},
    postedItems: {}
  }),
  created () {
    this.fetchAssignItems()
    this.fetchAssignedItems()
  },
  computed: {
    ...mapGetters('user', ['userId', 'isDesigner', 'isAuthenticated']),
    checkUserRoll () {
      return this.isDesigner
    }
  },
  methods: {
    async fetchAssignItems () {
      const form = { params: { owner_id: this.userId } }
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
        .get('http://localhost:3000/v1/assigns', form, headers)
        .then(response => response.data)
        .catch(err => console.log(err))
      console.log(res)
      this.assignItems = res
    },
    async fetchAssignedItems () {
      const assigned = await axios
        .get('http://localhost:3000/v1/assigns', { params: { designer_id: this.userId } }, { headers: getAuthDataFromStorage() })
        .then(response => response.data)
        .catch(err => console.log(err))
      console.log(assigned)
      this.assignedItems = assigned
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
