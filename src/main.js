import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/index.scss'
import * as dayjs from 'dayjs'


const app = createApp(App)
// 挂载Vue全局属性(不推荐) 使用getCurrentInstance().appContext.config.globalProperties获取属性
app.config.globalProperties.$dayjs = dayjs
  
app.use(ElementPlus)
app.use(router)
app.use(store)
app.use(dayjs)



app.mount('#app')
