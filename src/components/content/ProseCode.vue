<template>
  <div class="code">
    <slot />
    <div
      class="icon"
      :class="[isCopied ? 'copied' : '']"
      @click="handleCopy"
    >
      <svg v-show="isCopied" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="rgba(110, 144, 60, 1)" d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59L21 7Z" /></svg>
      <svg v-show="!isCopied" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512">
        <path fill="#aaa" d="M408 480H184a72 72 0 0 1-72-72V184a72 72 0 0 1 72-72h224a72 72 0 0 1 72 72v224a72 72 0 0 1-72 72Z" />
        <path fill="#aaa" d="M160 80h235.88A72.12 72.12 0 0 0 328 32H104a72 72 0 0 0-72 72v224a72.12 72.12 0 0 0 48 67.88V160a80 80 0 0 1 80-80Z" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '#imports'

export default defineComponent({
  props: {
    code: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: null
    },
    filename: {
      type: String,
      default: null
    },
    highlights: {
      type: Array as () => number[],
      default: () => []
    },
    meta: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isCopied: false
    }
  },
  methods: {
    handleCopy() {
      if (navigator.clipboard) {
        // clipboard api 复制
        navigator.clipboard.writeText(this.code)
      }
      else {
        const textarea = document.createElement('textarea')
        document.body.appendChild(textarea)
        // 隐藏此输入框
        textarea.style.position = 'fixed'
        textarea.style.clip = 'rect(0 0 0 0)'
        textarea.style.top = '10px'
        // 赋值
        textarea.value = this.code
        // 选中
        textarea.select()
        // 复制
        document.execCommand('copy', true)
        // 移除输入框
        document.body.removeChild(textarea)
      }
      this.isCopied = true
      setTimeout(() => {
        this.isCopied = false
      }, 2000)
    }
  }
})
</script>

<style lang="scss" scoped>
.code {
  position: relative;
  &:hover {
    .icon {
      opacity: 1;
      transition: all .3s;

      &:hover {
        background-color: var(--copy-bg-hover);
        &.copied {
          // background-color: var(--copied-bg);
        }
      }
    }
  }
  pre {
    code {
      .line {
        display: block;
        min-height: 1rem;
      }
    }
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 30px;
    height: 30px;
    right: 8px;
    top: 8px;
    font-size: 0.8rem;
    cursor: pointer;
    background-color: var(--copy-bg);
    border-radius: 4px;
    padding: 4px;
    opacity: 0;
    border: 1px solid transparent;

    &:hover {
      border: 1px solid var(--copy-border);
    }
    span {
      color: #fff;
    }
  }
}
</style>
