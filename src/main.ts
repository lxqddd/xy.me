import { createApp } from 'vue'
import './styles/reset.css'
import './styles/main.scss'
import App from './App.vue'
// import VueInMd from './components/VueInMd.vue'

const app = createApp(App)

// app.component('VueInMd', VueInMd)

app.mount('#app')
