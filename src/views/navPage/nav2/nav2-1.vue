<template>
  <div>
    这是nav2-1页面
    <el-button @click="addCount" >Add</el-button>
    <div>{{state.count}}</div>
    <div>{{count}}</div>
  </div>
</template>

<script>
export default {
  name: 'Nav2-1'
}
</script>
<script setup >
  import { ref, reactive, watch, watchEffect } from 'vue';

  // const count = ref(0)
  // watchEffect(() => {
  //   console.log(count.value)
  // })

  // setTimeout(() => {
  //   count.value++
  // }, 100)

  const addCount = () => {
    state.count++
    count.value++
  }

  // 侦听一个getter
  const state = reactive({count: 0})
  watch(
   () => state.count,
   (count, prevCount) => {
    debugger
  })

  // 直接侦听一个ref
  const count = ref(0)
  watch(count, (count, prevCount) => {
    // debugger
  })


</script>

<style lang="scss" scoped>

</style>