import { defineAsyncComponent } from 'vue'

export default {
  enhance: ({ app }) => {    
      app.component("BlogList", defineAsyncComponent(() => import("/Users/liuxq/Desktop/project/xy.me/docs/.vuepress/components/BlogList.vue"))),
      app.component("Main", defineAsyncComponent(() => import("/Users/liuxq/Desktop/project/xy.me/docs/.vuepress/components/Main.vue"))),
      app.component("Plum", defineAsyncComponent(() => import("/Users/liuxq/Desktop/project/xy.me/docs/.vuepress/components/Plum.vue")))
  },
}
