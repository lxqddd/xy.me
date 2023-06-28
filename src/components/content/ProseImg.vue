<template>
  <div class="img">
    <img :src="refinedSrc" :alt="props.alt">
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'ufo'
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: '90%'
  },
  height: {
    type: [String, Number],
    default: 'auto'
  }
})

const width = ref(props.width)
const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//'))
    return withBase(props.src, useRuntimeConfig().app.baseURL)
  return props.src
})
</script>

<style lang="scss" scoped>
.img {
  display: flex;
  justify-content: center;
  padding: 0.5rem;

  img {
    width: v-bind(width);
    height: auto;
    border-radius: 8px;
  }
}
</style>
