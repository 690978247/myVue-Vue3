<template>
  <div>
    <el-button @click="addToCart" ref="buttonRef" >Add to cart</el-button>

    <!-- <div v-for="(item,i) in list" :ref="el => { if (el) divs[i] = el }" > -->
    <div v-for="(item,i) in list" :ref="setItemRef" >
      <el-alert>Cart{{ item }}({{ cart + i }})</el-alert>
    </div>

    <div v-html="'<span>测试数据</span>'" >
    </div>

    <div v-cloak >
      测试测试测试： {{ message }}
    </div>

  </div>
</template>

<script>
export default {
  name: 'Nav1-2'
}
</script>
<script setup >
  import { ref, reactive, onRenderTracked, onRenderTriggered, onMounted, nextTick, shallowReadonly, isReadonly, toRaw } from 'vue'
  const cart = ref(0)
  const list = reactive([1,2,3,4,5])
  const divs = reactive([])
  const buttonRef = ref(null)
  const message = ref('数据001')
  const addToCart = () => {
    cart.value += 1
  }
  const state = shallowReadonly({
    foo: 1,
    nested: {
      bar: 2
    }
  })

  const foo = {}
  const reactiveFoo = reactive(foo)

  console.log(toRaw(reactiveFoo) === foo )

  // 改变 state 本身的 property 将失败
  state.foo++
  // ...但适用于嵌套对象
  isReadonly(state.nested)
  state.nested.bar++

  const setItemRef = (el, i) => {
    if (el) 
    divs.push(el)
  }

  onMounted(() => {
    console.log("mounted....");
    nextTick(() => {
      console.log(buttonRef.value)
      console.log(divs)
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
.red {
  color: red;
}
[v-cloak] {
  display: none;
}
</style>