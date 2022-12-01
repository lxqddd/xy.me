<template>
  <div class="blog-list-item" @click="routeLink(blogInfo.url)">
    <div class="title">{{ blogInfo.frontmatter.title }}</div>
    <div class="desc-wrap">
      <div class="date">date: {{ dayjs(blogInfo.frontmatter.pubDate).format('YYYY-MM-DD') }}</div>
      <div class="author">author: {{ blogInfo.frontmatter.author }}</div>
      <div class="tag">tag: {{ blogInfo.frontmatter.tag }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import dayjs from 'dayjs'
import { IBlog } from '../types/index'
import { routeLink } from '../utils/router'

const props = defineProps({
  blogInfo: {
    type: Object,
    default: () => ({})
  }
})

const blogInfo = ref<IBlog>(props.blogInfo as IBlog)
</script>

<style lang="scss" scoped>
.blog-list-item {
  border-radius: 4px;
  opacity: .7;
  padding: 8px 16px;
  margin: 8px;
  cursor: pointer;
  background-color: var(--c-bg);
  border: 1px solid rgba(204, 204, 204, 0.5);
  &:hover {
    opacity: 1;
  }
  .title {
    font-size: 1.2rem;
  }
  .desc-wrap {
    display: flex;
    align-items: center;
    font-size: .5rem;
    margin-top: 16px;
    div {
      margin-right: 12px;
    }
  }
}
</style>