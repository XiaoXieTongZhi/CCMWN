import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'font-awesome/css/font-awesome.css'

const app = createApp(App)
.use(VueAxios,axios)
.use(store)
.use(router)
.mount('#app')
