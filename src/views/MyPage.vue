<template>
  <div>
    <div>
      <v-container>
        <v-row>
          <v-btn rounded small class="ma-1"
          @click="toggleSections(1)"
          :disabled="currentSection.new">新規リメイク依頼</v-btn>
          <v-btn rounded small class="ma-1"
          @click="toggleSections(2)"
          :disabled="currentSection.progress">進行中のリメイク案件</v-btn>
        </v-row>
      </v-container>
    </div>
    <div v-if="checkUserRoll && assignedItems.length > 0 && currentSection.new">
      <v-container>
        <v-row>
          <v-col>
            <h4 class="accent--text">{{ newAssignedCount }}件の新規リメイク依頼があります</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="(item, index) in newAssigned()"
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
    <div v-if="checkUserRoll && progressAssignedCount > 0 && currentSection.progress">
      <v-container>
        <v-row>
          <v-col>
            <h5>{{ progressAssignedCount }}件の受注中のリメイク案件を表示しています</h5>
          </v-col>
        </v-row>
        <v-row></v-row>
      </v-container>
    </div>
    <div v-if="assignItems.length > 0">
      <v-container>
        <v-row>
          <h2>リメイク依頼中のアイテム一覧</h2>
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
    <div>
      <BackBtn @clickBackBtn="$router.back()" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { getAuthDataFromStorage } from '../api/auth.js'
import BackBtn from '../components/BackBtn.vue'

export default {
  name: 'MyPage',
  components: {
    BackBtn
  },
  data: () => ({
    assignItems: [],
    assignedItems: [],
    postedItems: [],
    currentSection: {
      new: true,
      progress: false
    }
  }),
  created () {
    this.fetchAssignItems()
    this.fetchAssignedItems()
  },
  computed: {
    ...mapGetters('user', ['userId', 'isDesigner', 'isAuthenticated']),
    checkUserRoll () {
      return this.isDesigner
    },
    newAssignedCount () {
      return this.assignedItems.filter(item => item.status === 0).length
    },
    progressAssignedCount () {
      return this.assignedItems.filter(item => item.status === 1).length
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
    toggleSections (i) {
      if (i === 1) {
        this.currentSection.new = true
        this.currentSection.progress = false
      } else {
        this.currentSection.new = false
        this.currentSection.progress = true
      }
    },
    showAssign (id) {
      this.$router.push({
        path: '/assign',
        query: {
          id: id
        }
      })
    },
    newAssigned () {
      return this.assignedItems.filter(item => item.status === 0)
    }
  }
}
</script>

<style>
h2,h5 {
  color:#757575;
}
</style>
