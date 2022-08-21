import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { route } from './router'
import './styles/reset.css'
import './styles/main.scss'
import './styles/markdown.scss'
import App from './App.vue'

const app = createApp(App)
const head = createHead()
app.use(head)
app.use(route)
app.mount('#app')
