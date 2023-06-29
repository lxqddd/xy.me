<template>
  <section class="prose slide-enter-content relative">
    <ContentDoc :path="path">
      <template #default="{ doc }">
        <DocBack />
        <DocRender :article="doc" />
        <DocToc :toc="doc.body.toc" />
        <!-- <Giscus
          repo="chansee97/nuxt-blog" repo-id="R_kgDOJZM7Qg" category="comments"
          category-id="DIC_kwDOJZM7Qs4CW1GZ" mapping="title" term="Welcome to my blog!" reactions-enabled="1"
          emit-metadata="1" input-position="top" theme="light_tritanopia" lang="zh-CN" loading="lazy"
        /> -->
      </template>

      <template #empty>
        <h1 class="text-center">
          Document is empty😅
        </h1>
      </template>

      <template #not-found>
        <h1 class="text-center">
          Not Found Any Document😗
        </h1>
      </template>
    </ContentDoc>
  </section>
</template>

<script setup lang="ts">
// import Giscus from '@giscus/vue'
import DocToc from '@/components/DocToc.vue'

const route = useRoute()
const post = route.params.slug as Array<string>

const path = post.join('/')
</script>
