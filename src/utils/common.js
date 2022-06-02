import axios from "axios"

/* 防抖 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

// export function debounce2(fn, delay) {
//   let timer
//   return function(...args) {
//     if (timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(() => {
//       fn.apply(this, args)
//     }, delay)
//   }
// }

export function debounce2(fn, delay) {
  let timer
  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/* 节流 */
export function throttle(func, wait, options) {
  var context, args, result
  var timeout = null
  // 之前的时间戳
  var previous = 0
  // 如果 options 没传则设为空对象
  if (!options) options = {}
  // 定时器回调函数
  var later = function() {
    // 如果设置了 leading，就将 previous 设为 0
    // 用于下面函数的第一个 if 判断
    previous = options.leading === false ? 0 : Date.now()
    // 置空一是为了防止内存泄漏，二是为了下面的定时器判断
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }
  return function() {
    // 获得当前时间戳
    var now = Date.now()
    // 首次进入前者肯定为 true
    // 如果需要第一次不执行函数
    // 就将上次时间戳设为当前的
    // 这样在接下来计算 remaining 的值时会大于0
    if (!previous && options.leading === false) previous = now
    // 计算剩余时间
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    // 如果当前调用已经大于上次调用时间 + wait
    // 或者用户手动调了时间
    // 如果设置了 trailing，只会进入这个条件
    // 如果没有设置 leading，那么第一次会进入这个条件
    // 还有一点，你可能会觉得开启了定时器那么应该不会进入这个 if 条件了
    // 其实还是会进入的，因为定时器的延时
    // 并不是准确的时间，很可能你设置了2秒
    // 但是他需要2.2秒才触发，这时候就会进入这个条件
    if (remaining <= 0 || remaining > wait) {
      // 如果存在定时器就清理掉否则会调用二次回调
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      // 判断是否设置了定时器和 trailing
      // 没有的话就开启一个定时器
      // 并且不能不能同时设置 leading 和 trailing
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}

// export function throttle2(fn, delay) {
//   let last = 0
//   return (...args) => {
//     const now = Date.now()
//     if (now - last > delay) {
//       last = now
//       fn.apply(this, args)
//     }
//   }
// }

export function throttle2(fn, delay) {
  let last = 0
  return (...args) => {
    const now = Date.now()
    if (now - last > delay) {
      last = now
      fn.apply(this, args)
    }
  }
}

/* 深拷贝 */
export function deepClone(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)

  if (cache.get(obj)) return cache.get(obj) // 如果出现循环引用，则返回缓存的对象，防止递归进入死循环
  let cloneObj = new obj.constructor() // 使用对象所属的构造函数创建一个新对象
  cache.set(obj, cloneObj) // 缓存对象，用于循环引用的情况

  for(let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], cache)  // 递归拷贝
    }
  }

  return cloneObj
}

/* 手写Promise */
export class MyPromise {
  constructor(executor) {
    this.status = 'pending' // 初始状态为等待
    this.value = null // 成功的值
    this.reason = null // 失败的原因
    this.onFulfilledCallbacks = [] //成功的回调函数存放的数组
    this.onRejectedCallbacks = [] // 失败的回调函数存放的数组
    let resolve = value => {
      if (this.status === 'pending') {
        this.status = 'fulfilled'
        this.value = value
        this.onFulfilledCallbacks.forEach(fn => fn()) // 调用成功的回调函数
      }
    }

    let reject = reason => {
      if (this.status === 'pending') {
        this.status === 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn()) // 调用失败的回调函数
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    // onFulfilled如果不是函数，则修改为函数，直接返回value
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    // onRejected如果不是函数，则修改为函数，直接抛出错误
    onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err}
    return new MyPromise((resolve, reject) => {
      if (this.status === 'fulfilled') {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
          } catch (err) {
            reject(err)
          }
        })
      }

      if (this.status === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
          } catch (err) {
            reject(err)
          }
        })
      }

      if (this.status === 'pending') {
        this.onFulfilledCallbacks.push(() => {  // 将成功的回调函数放入成功数组
          setTimeout(() => {
            let x = onFulfilled(this.value)
            x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
          })
        })

        this.onRejectedCallbacks.push(() => {  // 将失败的回调函数放入失败数组
          setTimeout(() => {
            let x = onRejected(this.reason)
            x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
          })
        })

      }

    })

  }

}

/* 异步控制并发数 */
export function limitRequest(urls = [], limit = 3) {
  return new Promise((resolve, reject) => {
    const len = urls.length
    let count = 0

    // 同时启动limit个任务
    while (limit > 0) {
      start()
      limit -= -1
    }

    function start() {
      const url = urls.shift() // 从数组中拿取第一个任务
      if(url) {
        axios.post(url).then(res => {
          // todo
        }).catch(err => {
          // todo
        }).finally(() => {
          if (counr === len - 1) {
            // 最后一个任务完成
            resolve()
          } else {
            // 完成之后，启动下一个任务
            count++
            start()
          }
        })
      }
    }

  })
}
