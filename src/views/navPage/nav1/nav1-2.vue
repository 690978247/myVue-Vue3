<template>
  <div>
    <el-button @click="addToCart" ref="buttonRef" >Add to cart</el-button>

    <!-- <div v-for="(item,i) in list" :ref="el => { if (el) divs[i] = el }" > -->
    <div v-for="(item,i) in list" :ref="setItemRef" >
      <el-alert>Cart{{ item }}({{ cart }})</el-alert>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav1-2'
}
</script>
<script setup >
  import { ref, reactive, onRenderTracked, onRenderTriggered, onMounted, nextTick } from 'vue'
  const cart = ref(0)
  const list = reactive([1,2,3,4,5])
  const divs = reactive([])
  const buttonRef = ref(null)
  const addToCart = () => {
    cart.value += 1
  }

  const setItemRef = (el, i) => {
    if (el) 
    divs.push(el)
  }

  onMounted(() => {
    console.log("mounted....");
    nextTick(() => {
      console.log(buttonRef.value)
    })
  })

  onRenderTracked(({ key, target, type }) => {
    console.log({ key, target, type });
    console.log("状态跟踪组件tracked----------->");
  });

  onRenderTriggered(({ key, target, type }) => {
    console.log({ key, target, type });
    console.log("状态跟踪组件trigger----------->");
  })

</script>

<style lang="scss" scoped>

</style>