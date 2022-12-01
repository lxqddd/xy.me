<template>
  <div class="blog-list-wrap">
    <div class="blog-list">
      <BlogListItem v-for="blog in curBlogList" :key="blog.url" :blogInfo="blog" />
    </div>
    <div class="tag-list">
      <div class="tag-item" v-for="tag in tags" :key="tag.tagName" @click="handleCheckTag(tag)">
        <div class="tag-name">{{ tag.tagName }}</div>
        <div class="tag-num">({{ tag.num }})</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import BlogListItem from './BlogListItem.vue'
import { IBlog, ITag, Tag } from '../types/index'
import dayjs from 'dayjs'

const props = defineProps({
  blogList: {
    type: Array,
    default: () => ([])
  }
})

const tags = ref<ITag[]>([])
const blogList = props.blogList as IBlog[]
const curBlogList = ref(blogList)

onMounted(() => {
  blogList.sort((a: IBlog, b: IBlog) => {
    return dayjs(b.frontmatter.pubDate).valueOf() - dayjs(a.frontmatter.pubDate).valueOf()
  })
  getTags()
})

const getTags = () => {
  const tagList: string[] = []
  const tagsMap: Record<string, number> = {}
  blogList.forEach(item => {
    const tag = item.frontmatter.tag
    if (!tagList.includes(tag)) {
      tagList.push(tag)
    }
    if (tagsMap[tag]) {
      tagsMap[tag] += 1
    } else {
      tagsMap[tag] = 1
    }
  })
  Object.keys(tagsMap).forEach(item => {
    tags.value.push({
      tagName: item as Tag,
      num: tagsMap[item]
    })
  })
  tags.value.push({
    tagName: 'All',
    num: blogList.length
  })
}

const handleCheckTag = (tag: ITag) => {
  if (tag.tagName !== 'All') {
    const filter = blogList.filter(blog => tag.tagName === blog.frontmatter.tag)
    curBlogList.value = filter
  } else {
    curBlogList.value = blogList
  }
}

</script>

<style lang="scss" scoped>
.blog-list-wrap {
  display: flex;

  .blog-list {
    flex: 1;
  }

  .tag-list {
    width: 200px;
    .tag-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--c-bg);
      border: 1px solid rgba(204,204,204,.5);
      border-radius: 4px;
      opacity: .6;
      margin-top: 8px;
      padding: 8px 16px;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
