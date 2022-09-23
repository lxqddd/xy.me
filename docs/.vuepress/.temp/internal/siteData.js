export const siteData = JSON.parse("{\"base\":\"/\",\"lang\":\"zh-CN\",\"title\":\"向阳\",\"description\":\"大话前端, 向阳的JavaScript技术博客, 向阳的博客, vue, JavaScript\",\"head\":[[\"link\",{\"rel\":\"icon\",\"href\":\"/favicon.svg\",\"color\":\"#000\"}]],\"locales\":{}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
