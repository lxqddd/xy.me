<template>
  <div class="home-page">
    <div class="self">
      <img src="../assets/imgs/self.jpeg">
      <div class="desc">
        乾坤已定，你我皆是牛马！
      </div>
    </div>
    <div class="show">
      <div
        class="item"
        v-for="item in showList"
        :key="item.name"
      >
        <a
          :href="item.link"
          target="_blank"
          class="name"
        >{{ item.name }}</a>
        <div class="desc">
          {{ item.desc }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const showList = ref<{
  name: string
  desc: string
  link: string
}[]>([
  {
    name: '@lxqddd/fzip',
    desc: '一个轻量、支持压缩等级的压缩工具，用于将文件或文件夹压缩为zip包。',
    link: 'https://github.com/lxqddd/FZip'
  }, {
    name: 'change-fill-name',
    desc: '一个命令行工具，用于修改目录名称、文件名称及其拓展名。',
    link: 'https://github.com/lxqddd/change-file-name'
  }
])
console.log(showList)
</script>

<style lang="scss" scoped>
.home-page {
  .self {
    overflow: hidden;
    text-align: center;
    img {
      width: 260px;
      height: 260px;
      border-radius: 50%;
    }
    .desc {
      padding-top: 20px;
      font-size: 20px;
    }
  }
  .show {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    color: var(--color);
    opacity: 0.8;
    padding-top: 40px;
    border-top: 1px solid rgba(#fff, 0.5);
    .item {
      width: 45%;
      .name {
        display: inline-block;
        text-decoration: none;
        font-size: 30px;
        color: var(--color);
        padding-bottom: 12px;
      }
      .desc {
        line-height: 24px;
      }
    }

  }
}
</style>
