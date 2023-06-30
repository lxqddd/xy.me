<template>
  <div class="code">
    <slot />
    <div
      class="icon"
      :class="[isCopied ? 'copied' : '']"
      @click="handleCopy"
    >
      <span v-show="isCopied" class="success i-lucide:check" />
      <span v-show="!isCopied" class="copy i-lucide:clipboard-copy" />
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
    transition: all .3s;

    .success {
      color: rgba(110, 144, 60, 1)
    }

    .copy {
      color: #aaa;
    }

    &:hover {
      border: 1px solid var(--copy-border);
    }
  }
}
</style>
