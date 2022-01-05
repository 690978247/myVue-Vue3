import axios from "axios"
import { ElMessageBox, ElMessage  } from 'element-plus'
import store from "../store"

console.log('当前环境', import.meta.env.VITE_APP_BASE_API)
// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // url = base url + request url
  timeout: 15000 // 请求超时
})

// 请求拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  const res = response.data
  if (res.code !== 20000) {
    ElMessage({
      message: res.message || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    if (res.code === 50008 || res.code === 500012 || res.code === 50014) {
      ElMessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        confirmButtonText: 'Re-Login',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(() => {
        /* do something */
      })

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }

  }
}, error => {
  console.log('err' + error) // for debug
  ElMessage({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

export default service