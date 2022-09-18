import { defineAsyncComponent } from 'vue'

export default {
  enhance: ({ app }) => {    
      app.component("Plum", defineAsyncComponent(() => import("/Users/liuxq/Desktop/project/blog-vuepress/docs/.vuepress/components/Plum.vue")))
  },
}
