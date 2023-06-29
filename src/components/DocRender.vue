<template>
  <DocTitle :article="props.article" />
  <ContentRenderer :value="props.article" />
  <DocFooter />
</template>

<script setup lang="ts">
import DocFooter from './DocFooter.vue'

const props = defineProps(['article'])
</script>
