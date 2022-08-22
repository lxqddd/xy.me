import { useDark } from '@vueuse/core'
const isDark = useDark()
const toggleTheme = () => {
  isDark.value = !isDark.value
}

export {
  isDark,
  toggleTheme
}
