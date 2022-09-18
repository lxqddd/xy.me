<template>
  <div class="blog-list-wrap">
    <div class="blog-item-wrap">
      <div
        v-for="(blog, index) in curList"
        :key="index"
        class="blog-item"
        @click="linkToBlogDetail(blog)"
      >
        <div class="title">{{ blog.title }}</div>
        <div class="desc-wrap">
          <div class="date">date: {{ blog.date }}</div>
          <div class="author">author: {{ blog.author }}</div>
          <div class="column">tag: {{ blog.column }}</div>
        </div>
      </div>
    </div>
    <div class="column-wrap">
      <div
        v-for="item in blogType"
        :key="item.value"
        :class="['column-item', selectedColumn === item.value ? 'selected' : '']"
        @click="filterColum(item)"
      >
        <div class="column">{{ item.label }}</div>
        <div class="num">({{ blogMap[item.value].length }})</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"
import { ref, onMounted } from "vue";
import { blogMap, allBlog, blogType } from "../configs/blogList.ts"
import type { TypeKey, Blog } from "../configs/blogList.ts"

const curList = ref<Blog[]>([])

onMounted(() => {
  curList.value = allBlog
})

const router = useRouter()
const linkToBlogDetail = (blog) => {
  router.push(blog.link)
}

const selectedColumn = ref<TypeKey>('')
type column = {
  label: string
  value: TypeKey
}
const filterColum = (column: column) => {
  curList.value = blogMap[column.value]
  selectedColumn.value = column.value
}
</script>

<style lang="scss" scoped>
.blog-list-wrap {
  display: flex;
  justify-content: space-between;
  .blog-item-wrap {
    flex: 1;
    margin-right: 16px;
    .blog-item {
      border: 1px solid rgba(#ccc, 0.5);
      border-radius: 4px;
      opacity: 0.7;
      padding: 8px 16px;
      margin: 8px;
      cursor: pointer;
      background: var(--c-bg);
      &:hover {
        opacity: 1;
      }
      .title {
        font-size: 1.2rem;
      }
      .desc-wrap {
        display: flex;
        align-items: center;
        font-size: 0.5rem;
        margin-top: 16px;
        div {
          margin-right: 12px;
          &:last-child {
            margin-right: 0px;
          }
        }
      }
    }
  }
  .column-wrap {
    width: 200px;
    .column-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--c-bg);
      border: 1px solid rgba(#ccc, 0.5);
      border-radius: 4px;      
      opacity: 0.6;
      margin-top: 8px;
      padding: 8px 16px;
      cursor: pointer;
      &.selected {
        opacity: 1;
      }
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>