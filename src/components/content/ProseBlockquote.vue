<template>
  <blockquote class="blockquote">
    <slot />
  </blockquote>
</template>

<style lang="scss" scoped>
.blockquote {
    padding: 5px 1em;
    font-style: italic;
    background-color: var(--common-bg) !important;
    border-color: var(--common-bg);
    border-left-width: 0.4em;
    border-radius: var(--common-rd);

    > p {
      margin: 0.5em 0;
    }
  }
</style>