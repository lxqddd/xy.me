import { createApp } from 'vue'
import './styles/reset.css'
import './styles/main.scss'
import './styles/markdown.scss'
import { createHead } from '@vueuse/head'
import { route } from './router'

import App from './App.vue'
// import VueInMd from './components/VueInMd.vue'

const app = createApp(App)
const head = createHead()

// app.component('VueInMd', VueInMd)

app.use(head)
app.use(route)
app.mount('#app')
