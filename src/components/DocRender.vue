<template>
  <DocTitle :article="article" />
  <ContentRenderer :value="article" />
  <DocFooter />
</template>

<script setup lang="ts">
import DocFooter from './DocFooter.vue'

const { article } = defineProps(['article'])

useSeoMeta({
  title: article.title,
  ogTitle: '向阳 - 博客',
  description: '记录生活，记录一些技术',
  ogDescription: '向阳的个人博客'
})
</script>
