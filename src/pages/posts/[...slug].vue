<template>
  <section class="prose slide-enter-content relative">
    <ContentDoc :path="path">
      <template #default="{ doc }">
        <DocBack />
        <DocRender :article="doc" />
        <DocToc :toc="doc.body.toc" />
        <Giscus
          repo="lxqddd/xy.me"
          repo-id="R_kgDOHuwO5w"
          category="Announcements"
          category-id="DIC_kwDOHuwO584CXXUA"
          mapping="pathname"
          term="Welcome to my blog!"
          reactions-enabled="1"
          emit-metadata="1"
          input-position="top"
          :theme="giscusTheme"
          lang="zh-CN"
        />
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
import Giscus from '@giscus/vue'
import DocToc from '@/components/DocToc.vue'
import { useDark } from '@/hooks/useDark'

const { isDark } = useDark()

const route = useRoute()
const post = route.params.slug as Array<string>
const path = post.join('/')

const giscusTheme = ref<'light' | 'dark'>('light')

watch(isDark, (val) => {
  giscusTheme.value = val ? 'dark' : 'light'
})
</script>
