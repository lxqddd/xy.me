<template>
  <div class="home-page">
    <div class="self">
      <!-- <img src="../assets/imgs/self.jpeg"> -->
      <div class="self-desc">
        <div class="name">
          向阳
        </div>
        <div>一个略懂一点前端的前端er</div>
      </div>
      <!-- <div class="desc">
        乾坤已定，你我皆是牛马！
      </div> -->
    </div>
    <div class="show">
      <div class="title">
        小工具
      </div>
      <div class="tools">
        <div
          v-for="item in showList"
          :key="item.name"
          class="item"
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
      <div class="title">
        小游戏
      </div>
      <div class="games">
        <div
          v-for="item in gameList"
          :key="item.name"
          class="item"
        >
          <a
            class="name"
            :href="item.link"
            target="_blank"
          >
            {{ item.name }}
          </a>
          <div class="desc">
            {{ item.desc }}
          </div>
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
    name: 'change-file-name',
    desc: '一个命令行工具，用于修改目录名称、文件名称及其拓展名。',
    link: 'https://github.com/lxqddd/change-file-name'
  }
])

const gameList = ref<{
  name: string
  desc: string
  link: string
  experienceLink: string
}[]>([
  {
    name: '俄罗斯方块',
    desc: '用typescript、webpack 和 jQuery 写的一个小游戏，涉及了一些设计模式和一些面向对象开发的思想；有点意思。',
    link: 'https://github.com/lxqddd/Tetris',
    experienceLink: 'https://lxqddd.github.io/Tetris/'
  }
])
</script>

<style lang="scss" scoped>
.home-page {
  .self {
    overflow: hidden;
    text-align: center;
    .self-desc {
      padding-top: 100px;
      padding-bottom: 50px;
      font-size: 30px;
      .name {
        font-size: 40px;
        margin-bottom: 20px;
      }
    }
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
    .title {
      font-size: 30px;
      border-bottom: 1px solid rgba(#aaa, 0.5);
      margin-top: 40px;
      margin-bottom: 20px;
      padding-bottom: 8px;
    }
    .tools {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      color: var(--color);
      opacity: 0.8;
    }
    .item {
      width: 45%;
      cursor: pointer;
      .name {
        display: inline-block;
        text-decoration: none;
        font-size: 24px;
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
