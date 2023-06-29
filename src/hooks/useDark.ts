import { ref } from 'vue'

const isDark = ref<boolean | null>()

function checkTheme(dark: boolean) {
  isDark.value = dark
}

export function useDark() {
  return {
    isDark,
    checkTheme
  }
}
