<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
          rounded
          outlined
          v-model="keyword"
          append-icon="mdi-magnify"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-list>
      <template v-for="(designer, index) in filteredDesigners">
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
    selectedItem: null,
    keyword: ''
  }),
  created () {
    this.fetchDesigners()
  },
  computed: {
    ...mapGetters('designers', ['designers']),
    filteredDesigners () {
      const word = new RegExp(this.keyword)
      return this.designers.filter(designer => {
        return Object.values(designer).join('').match(word)
      })
    }
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
