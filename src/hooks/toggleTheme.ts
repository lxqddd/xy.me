import { useDark } from "@vueuse/core"

export const isDark = useDark()

export const toggleTheme = (value: boolean) => {
  isDark.value = value
}
