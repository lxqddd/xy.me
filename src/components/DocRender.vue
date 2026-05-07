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
  ogTitle: `${article.title} | 向阳的博客`,
  description: article.description || '向阳的个人技术博客',
  ogDescription: article.description || '向阳的个人技术博客',
  ogType: 'article',
  ogImage: '/logo.svg',
  twitterCard: 'summary_large_image',
  twitterTitle: `${article.title} | 向阳的博客`,
  twitterDescription: article.description || '向阳的个人技术博客',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.description || '',
        author: {
          '@type': 'Person',
          name: article.author || '向阳',
        },
        datePublished: article.pubDate,
        url: `https://xy.me/posts${article._path}`,
        publisher: {
          '@type': 'Person',
          name: '向阳',
        },
      }),
    },
  ],
})
</script>
