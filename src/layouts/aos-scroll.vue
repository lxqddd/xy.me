<script setup lang='ts'>
import NavBar from '@/components/NavBar.vue'
import Plum from '@/components/Plum.vue'
</script>

<template>
  <div class="layout pb-40">
    <NavBar />
    <div class="content">
      <slot />
    </div>
    <Plum />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  .content {
    width: 700px;
    margin: 0 auto;
  }
}
</style>
