<template>
  <div>
    <h2>アイテム投稿画面</h2>
    <v-form>
      <v-text-field
      label="Item title"
      ></v-text-field>

      <!-- <v-file-input
      v-model="images"
      multiple
      clearrable
      label="Item Images"
      >
        <template v-slot:selection="{ index, text }">
          <v-chip
            label
            close
            @click:close="deleteChip(index, text)"
          >{{ text }}</v-chip>
        </template>
      </v-file-input> -->
      <v-text-field
      label="Description"
      ></v-text-field>
      <v-button>
        このアイテムを出品する
      </v-button>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'ItemCreate',
  data: () => ({
    uploadFileLost: []
  })
}
</script>
