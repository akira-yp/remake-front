<template>
  <div>
    <v-list>
      <template v-for="(designer, index) in designers">
        <v-list-item
        :key="index"
        @click="toPortfolio(index)"
        >
          <v-list-item-avatar size="64">
            <v-icon
            size="64"
            v-if="!designer.avatar"
            >mdi-account</v-icon>
            <v-img
              v-else
              :src="designer.avatar"
              :aspect-ratio="1/1"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ designer.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ designer.greeting }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="`divider-${index}`" inset></v-divider>
      </template>
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
