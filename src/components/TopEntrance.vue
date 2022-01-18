<template>
  <div >
    <v-container>
      <section></section>
      <v-row justify="center" height="100" align="end">
        <v-col cols="auto">
          <h1 class="white--text">ファッションを<br>もっと楽しもう</h1>
        </v-col>
      </v-row>
      <v-row justify="center" class="top-wrap" align="end">
        <img
        @click="entranceEvent"
        src="@/assets/remake-logo.png" class="toplogo"
        >
      </v-row>
      <v-row justify="center" class="mt-10">
        <img src="@/assets/remake-logo-text.png" alt="">
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'TopEntrance',
  methods: {
    entranceEvent () {
      this.$emit('routeEvent')
    }
  }
}
</script>

<style>
.toplogo {
  object-fit: contain;
  width:200px;
}
.top-wrap {
  height:200px;
}
h1,h2,h3,h4,h5,h6 {
  color:#212121;
}
</style>
