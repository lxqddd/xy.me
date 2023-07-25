<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div title="Toggle Color Scheme" class="i-icon-park-outline-sun dark:i-icon-park-outline-moon hover" @click="toggleDark()" />
</template>
