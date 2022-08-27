<template>
  <div class="main">
    <Column
      :cover="cover"
      desc="这是vue专栏的描述"
    />
    <Column
      :cover="cover"
      desc="这是vue专栏的描述"
    />
    <Column
      :cover="cover"
      desc="这是vue专栏的描述"
    />
    <Column
      :cover="cover"
      desc="这是vue专栏的描述"
    />
    <Column
      :cover="cover"
      desc="这是vue专栏的描述"
    />
    <Column
      :cover="cover"
      desc="这是vue专栏的描述"
    />
  </div>
</template>
<script lang="ts" setup>
import Column from '../components/Column.vue'
import cover from '../assets/imgs/columnCover/VueSeries.png'
</script>
<style scoped lang="scss">
.main {

}
</style>
