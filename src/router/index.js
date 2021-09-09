import { createRouter, createWebHashHistory  } from "vue-router"
import NotFound from '../components/404NotFound.vue'

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory,abstract模式: createMemoryHistory()
  routes:[
    {
      path: '/',
      component: () => import('../components/HelloWorld.vue')
    },
    {
      path: '/helloword',
      component: () => import('../components/HelloWorld.vue')
    },
    {
      path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound
    }
  ]
})

// 命名路由
// router.resolve({
//   name: 'not-found',
//   params: { pathMatch:['not', 'found']}
// }).href

export default router