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
          name: 'Home',
          component: () => import('../views/home/home.vue'),
          meta: {
            title: '首页',
            icon: 'el-icon-star-off'
          },
        }
      ]
    },
    {
      path: '/nav',
      component: () => import('../layout/index.vue'),
      redirect: '/nav/nav1-1',
      meta: {
        title: '嵌套菜单'
      },
      children: [
        {
          path: 'nav1-1',
          name: 'Nav1-1',
          component: () => import('../views/navPage/nav1/nav1-1.vue'),
          meta: { title: 'nav1-1页面' }
        },
        {
          path: 'nav1-2',
          name: 'Nav1-2',
          component: () => import('../views/navPage/nav1/nav1-2.vue'),
          meta: { title: 'nav1-2页面' }
        },
        {
          path: 'nav1-3',
          name: 'Nav1-3',
          component: () => import('../views/navPage/nav1/nav1-3.vue'),
          meta: { title: 'nav1-3页面' }
        },
        {
          path: 'nav1-4',
          name: 'Nav1-4',
          component: () => import('../views/navPage/nav1/nav1-4-1.vue'),
          meta: { title: 'nav1-4页面' }
        },
        {
          path: 'nav2-1',
          name: 'Nav2-1',
          component: () => import('../views/navPage/nav2/nav2-1.vue'),
          meta: { title: 'nav2-1页面' }
        },
        {
          path: 'nav2-2',
          name: 'Nav2-2',
          component: () => import('../views/navPage/nav2/nav2-2-1.vue'),
          meta: { title: 'nav2-2页面' }
        },
        {
          path: 'nav3-1',
          name: 'Nav3-1',
          component: () => import('../views/navPage/nav3/nav3-1.vue'),
          meta: { title: 'nav3-1页面' }
        },
        {
          path: 'nav4-1',
          name: 'Nav4-1',
          component: () => import('../views/navPage/nav4/nav4-1.vue'),
          meta: { title: 'nav4-1页面' }
        }
      ]
    },
    {
      path: '/helloword',
      component: () => import('../layout/index.vue'),
      redirect: '/helloword/index',
      meta: {
        title: 'Hello Page'
      },
      children: [
        {
          path: 'index',
          component: () => import('../components/HelloWorld.vue'),
          meta: {
            title: 'Hello Page'
          },
        }
      ]
    },
    {
      path: '/404',
      component: NotFound,
      hidden: true,
      meta: {
        title: '404'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/404',
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