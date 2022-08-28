<template>
  <div class="column">
    <div class="cover">
      <img
        :src="props.cover"
        class="cover"
      >
    </div>
    <div class="desc">
      {{ props.desc }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  cover: {
    type: String,
    default: ''
  },
  desc: {
    type: String,
    default: '这是专栏的描述'
  }
})

</script>

<style lang="scss" scoped>
.column {
  width: 300px;
  display: inline-block;
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 4px;
  .cover {
    width: 100%;
  }
}
</style>
