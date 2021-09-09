import { createRouter, createWebHashHistory  } from "vue-router"
import Helloword from '../components/HelloWorld.vue'

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes:[
      {
        path: '/',
        component: Helloword
    }
  ]
})

export default router