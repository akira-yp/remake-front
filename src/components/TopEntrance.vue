<template>
  <div >
    <v-continer>
      <v-row justify="center" class="top-wrap" align="end">
        <img
        @click="entranceEvent"
        src="@/assets/remakelogo.png" class="toplogo"
        >
      </v-row>
      <v-row justify="center">
        <h1>Remake Tree</h1>
      </v-row>
    </v-continer>
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
  height:300px;
}
h1 {
  color:#97D61B;
}
</style>
