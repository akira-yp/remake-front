<template>
  <div>
    <v-list

    >
      <v-list-item
        v-for="(designer, index) in designers"
        :key="index"
      >
        <v-list-item-icon>
          <v-icon
            v-if="!designer.avatar"
            size="20px"
          >mdi-account</v-icon>
          <v-img
            size="20px"
            :aspect-ratio="1/1"
            rounded
            :src="designer.avatar"
            v-else
          ></v-img>
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
    designers: this.designers(),
    selectedItem: Number
  }),
  created () {
    this.fetchDesigners()
  },
  computed: {
    ...mapGetters('designers', ['designers'])
  },
  methods: {
    ...mapActions('designers', ['fetchDesigners'])
  }
}
</script>
