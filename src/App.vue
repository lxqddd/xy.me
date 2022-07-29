<script setup lang="ts">
  import Plum from './components/Plum.vue'
  import Test from './components/Test.md'
  import { useDark } from '@vueuse/core'

  const isDark = useDark()

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }
</script>

<template>
  <Plum />
  <Test />
  <button @click="toggleTheme">切换主题</button>
</template>
