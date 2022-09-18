import { defineAsyncComponent } from 'vue'

export default {
  enhance: ({ app }) => {    
      app.component("FooBar", defineAsyncComponent(() => import("/Users/liuxq/Desktop/project/blog-vuepress/docs/.vuepress/components/Plum.vue")))
  },
}
