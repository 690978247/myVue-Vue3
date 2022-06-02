<template>
   <div>
    <h2>{{ state.count }}</h2>
    <button @click="add">防抖</button>
    <br />
    <br />
    <button @click="test(1,2,3,4)">节流</button>
    <br />
    <br />
    <button @click="clone">克隆</button>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue"
import { debounce, debounce2, throttle, throttle2, deepClone, MyPromise, limitRequest } from '@/utils/common'
const state = reactive({
  count: 1
})

const add = debounce(() => {
  console.log('11111')
  state.count++
}, 300)

// const count = ref(1)

// const add = () => {
//   count.value ++
// }

const test = throttle2((...args) => {
  // console.log(args)
  console.log('22222')
  state.count++
}, 1000)

const cloneState = deepClone(state)
const clone = () => {
  console.log(state, cloneState)
}

/* MyPromise */
// 测试
function p1() {
  return new MyPromise((resolve, reject) => {
    setTimeout(resolve, 1000, 1)
  })
}
function p2() {
  return new MyPromise((resolve, reject) => {
    setTimeout(resolve, 1000, 2)
  })
}
p1().then(res => {
  console.log(res) // 1
  return p2()
}).then(ret => {
  console.log(ret) // 2
})


/* 异步控制并发数 */



</script>
<style lang="scss" scoped >
</style>