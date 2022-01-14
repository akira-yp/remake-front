<template>
  <div>
    <v-btn
    @click="goBackPage"
    class="backbtn"
    color="remake_d"
    elevation="10"
    fab>
      <v-icon color="white">mdi-arrow-left</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'BackBtn',
  methods: {
    goBackPage () {
      this.$emit('clickBackBtn')
    }
  }
}
</script>

<style>
.backbtn {
  position: fixed;
  bottom: 5px;
  right: 5px;
}
</style>
