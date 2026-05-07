<template>
  <div class="resume">
    <section class="prose">
      <ContentDoc path="resume" class="slide-enter-content" />
    </section>
    <div class="goven">
      备案号：浙ICP备2021036330号-1
    </div>
  </div>
</template>

<script setup lang='ts'>
useSeoMeta({
  title: '向阳 - 关于我',
  description: '向阳的个人主页，前端开发工程师的技术博客与简历。',
  ogTitle: '向阳 - 关于我',
  ogDescription: '向阳的个人主页，前端开发工程师的技术博客与简历。',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://xy.me/' }]
})
</script>

<style lang="scss" scoped>
.resume {
  .goven {
    position: fixed;
    bottom: 10px;
    left: 0px;
    right: 0px;
    color: #999;
    text-align: center;
    font-size: 0.8rem;
  }
}
</style>
