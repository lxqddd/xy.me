import AOS from 'aos'

export default defineNuxtPlugin(async (NuxtApp) => {
  // 注意： 动画库滚动监听的是html;元素的内部滚动不会触发进入离开视图动画
  // 不要使用默认的layout布局
  NuxtApp.AOS = new AOS.init({
    // 初始化 AOS 库
    disable: 'mobile', // 指定在移动设备上禁用 AOS 动画效果
    duration: 1000, // 动画持续时间
    easing: 'ease-in-out', // 缓动函数
    offset: 20, // 元素在页面中的偏移量（单位：像素）
    once: false // 是否只播放一次动画效果
  })
})
