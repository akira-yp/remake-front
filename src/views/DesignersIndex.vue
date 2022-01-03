<template>
  <div>
    <v-list

    >
      <v-list-item
        v-for="(designer, index) in designers"
        :key="index"
        @click="toPortfolio(index)"
      >
        <v-list-item-icon>
          <v-avatar>
            <v-icon
            size="48"
            v-if="!designer.avatar"
            >mdi-account</v-icon>
            <v-img
              v-else
              :src="designer.avatar"
              :aspect-ratio="1/1"
            ></v-img>
          </v-avatar>
        </v-list-item-icon>
        <v-list-item-content>
          {{ designer.name }}
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'DesignersIndex',
  data: () => ({
    selectedItem: null
  }),
  created () {
    this.fetchDesigners()
  },
  computed: {
    ...mapGetters('designers', ['designers'])
  },
  methods: {
    ...mapActions('designers', ['fetchDesigners']),
    toPortfolio (index) {
      this.$router.push({
        path: '/portfolio',
        query: {
          id: this.designers[index].id
        }
      })
    }
  }
}
</script>
