<template>
  <div class="main">
    <div class="content">
      乾坤已定，你我皆是牛马!
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: cursive;
    font-size: 1.95rem;
    position: absolute;
    top: var(--navbar-height);
    right: 0px;
    left: 0px;
    bottom: 0px;
    .content {
      margin-top: - var(--navbar-height);
    }
  }
</style>