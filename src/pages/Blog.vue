<template>
  <div class="blog">
    <div class="tabs-wrap">
      <div
        v-for="item in blogTypes"
        :key="item.value"
        class="tabs"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

interface IBlogTypes {
  label: string
  value: string
}

const blogTypes = ref<IBlogTypes[]>([
  {
    label: 'Vue',
    value: 'VueSeries'
  }, {
    label: 'Electron',
    value: 'Electron'
  }, {
    label: 'JavaScript',
    value: 'JavaScript'
  }, {
    label: 'Css',
    value: 'Css'
  }, {
    label: '设计模式',
    value: 'DesignPattern'
  }, {
    label: '算法',
    value: 'Algorithm'
  }
])

console.log(blogTypes)
</script>

<style lang="scss" scoped>
  .blog {
    .tabs-wrap {
      display: flex;
      justify-content: space-between;
      max-width: 800px;
      font-size: 22px;
      .tabs {
        opacity: 0.6;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
</style>
