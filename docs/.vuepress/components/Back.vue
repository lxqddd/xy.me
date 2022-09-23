<template>
  <div class="back">
    <span class="content" @click="handleBack">cd ..</span>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const handleBack = () => {
  router.go(-1)
}
</script>
<style lang="scss" scoped>
  .back {
    text-align: right;
    padding-right: 18px;
    .content {
      cursor: pointer;
      opacity: 0.6;
      display: inline-block;
      margin-top: 50px;
      &:hover {
        opacity: 1;
      }
    }
  }
</style>