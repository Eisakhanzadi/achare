import './assets/main.css'
import axios from 'axios';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')


axios.defaults.baseURL = 'https://stage.achareh.ir/api/'
axios.defaults.headers={
  Authorization :'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4' ,
  'Content-Type': 'application/json'
}
