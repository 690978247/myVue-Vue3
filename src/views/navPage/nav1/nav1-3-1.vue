<template>
  <div>
    <div ref="myRef" >获取单个Dom元素</div>
    <el-button ref="btn">这是一个按钮</el-button>
    <div>获取多个元素</div>
    <div v-for="(item, index) in arr" :key="index" :ref="setRef" >
     {{item}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav1-3-1'
}
</script>
<script setup >
  import { ref, reactive, onMounted, nextTick } from 'vue'
  const myRef = ref(null)
  const btn = ref(null)
  const arr = reactive([1, 2, 3])
  const refs = reactive([])

  const setRef = (el) => {
    refs.push(el)
  }

  // nextTick(() => {
  //   console.log(refs[0])
  // })

  onMounted(() => {
    console.log(myRef)
    console.log(btn)
    // nextTick(() => {
    //   console.log(refs[0])
    // })
  })

</script>

<style lang="scss" scoped>

</style>