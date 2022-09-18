export const data = JSON.parse("{\"key\":\"v-76fdf177\",\"path\":\"/blogs/\",\"title\":\"博客列表\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"博客列表\",\"lastUpdated\":false,\"contributors\":false},\"excerpt\":\"\",\"headers\":[],\"git\":{\"updatedTime\":1663492268000,\"contributors\":[{\"name\":\"向阳\",\"email\":\"xiangqian_liu@163.com\",\"commits\":1}]},\"filePathRelative\":\"blogs/README.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
