<template>
  <div class="post">
    <template
      v-for="item in blogMap"
      :key="item[0]"
    >
      <div
        slide-enter pointer-events-none relative h20 select-none
      >
        <span
          absolute left--3rem top--2rem text-8em font-bold color-transparent text-stroke-2 text-stroke-hex-aaa op10
        >{{ item[0] }}</span>
      </div>
      <div
        v-for="content in item[1]"
        :key="content.path"
        class="slide-enter item mb-6 mt-2 block font-normal"
        flex="~ col md:row gap-2 md:items-center"
        @click="jumpToDetail(content)"
      >
        <div
          class="title text-lg leading-1.2em"
          flex="~ gap-2 wrap"
        >
          {{ content.title }}
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang='ts'>
import dayjs from 'dayjs'
import type { IPost } from '@/types/index'

const blogMap = ref<Array<[string, IPost[]]>>([])

onMounted(async () => {
  const contentQuery = (await queryContent().find())

  const res = contentQuery.map(item => ({
    author: item.author,
    description: item.description,
    draft: item.draft,
    pubDate: item.pubDate,
    tag: item.tag,
    path: item._path,
    year: dayjs(item.pubDate).format('YYYY'),
    title: item.title
  })) as IPost[]

  const sortContent = res.sort((a: IPost, b: IPost) => {
    if (a.pubDate > b.pubDate)
      return -1
    if (a.pubDate < b.pubDate)
      return 1
    return 0
  })

  const years = Array.from(new Set(sortContent.map(item => item.year)))

  years.forEach((item) => {
    blogMap.value.push([item, sortContent.filter(content => item === content.year && content.path !== '/resume' && !content.draft)])
  })
})

function jumpToDetail(data: IPost) {
  useRouter().push(`/posts${data.path}`)
}
</script>

<style lang="scss" scoped>
.post {
  .title {
    opacity: 0.7;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
