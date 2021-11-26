<template>
  <div>
    <span>这是nav1-3页面, 下面是router-view</span>
    <router-view v-slot="{ Component }" >
      <transition name="fade-transform" mode="out-in">
          <component :is="Component" ></component>
      </transition>
    </router-view>
    <input v-model="text" >
    <span>{{text}}</span>
  </div>
</template>

<script>
export default {
  name: 'Nav1-3'
}
</script>

<script setup >
import { customRef, shallowRef, isReactive, triggerRef, watchEffect } from 'vue';
const  useDebouncedRef = (value, delay = 200) => {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value =  newValue
          trigger()
        }, delay)
      }
    }
  })
}

const text = useDebouncedRef('hello')
const foo = shallowRef({})
// 改变ref的值是响应式的
foo.value = {}
// 但是这个值不会被转换
isReactive(foo.value)

const shallow = shallowRef({
  greet: 'Hello,world'
})

// 第一次运行时记录一次"Hello, world"
watchEffect(() => {
  console.log(shallow.value.greet)
})

// 这不会触发作用（effect）,因为ref是浅层的
shallow.value.greet = 'Hello, universe'

// 记录 “Hello,universe”
triggerRef(shallow)





</script>

<style lang="scss" scoped>

</style>