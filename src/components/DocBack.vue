<template>
  <div class="pr-2em xl:absolute xl:top-0 xl:right-full xl:h-full">
    <div class="sticky top-14 w-8em">
      <div class="cursor-pointer" @click="$router.back()">
        <div class="i-icon-park-outline-left-small-up" /> Back
      </div>

      <div class="hidden xl:block cursor-pointer" @click="backTop">
        <div class="i-icon-park-outline-to-top-one" /> To Top
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
function backTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
