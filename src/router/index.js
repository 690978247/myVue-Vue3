import { createRouter, createWebHashHistory  } from "vue-router"
import NotFound from '../components/404NotFound.vue'

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory,abstract模式: createMemoryHistory()
  routes:[
    {
      path: '/',
      component: () => import('../layout/index.vue'),
      redirect: '/home',
      meta: {
        title: '首页'
      },
      children: [
        {
          path: 'home',
          component: () => import('../views/home/home.vue'),
          meta: {
            title: '首页',
            icon: 'el-icon-star-off'
          },
        }
      ]
    },
    {
      path: '/helloword',
      component: () => import('../components/HelloWorld.vue'),
      meta: {
        title: 'Hello Page'
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      hidden: true,
      component: NotFound,
      meta: {
        title: '404 Page'
      },
    }
  ]
})

// 命名路由
// router.resolve({
//   name: 'not-found',
//   params: { pathMatch:['not', 'found']}
// }).href

export default router