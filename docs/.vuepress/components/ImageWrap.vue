<template>
  <div class="img-wrap">
    <img :src="props.src" :alt="props.alt">
    <div v-if="props.desc" class="desc">{{ props.desc }}</div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  desc: {
    type: String,
    default: ''
  }
})
</script>
<style lang="scss" scoped>
  .img-wrap {
    text-align: center;
    overflow: hidden;
    padding-top: 8px;
    padding-bottom: 16px;
    img {
      width: 90%;
      border-radius: 6px;
    }
    .desc {
      text-align: left;
      width: 90%;
      margin: 0 auto;
    }
  }
</style>