import { createApp, markRaw } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import axios from 'axios'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)
app.config.globalProperties.axios = axios
pinia.use(({ store }) => {
  store.$router = markRaw(router)
})
app.use(router).use(pinia).mount('#app')
