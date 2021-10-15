<script setup>
import { ref, onMounted, watch, computed } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
const list = [1,2,3,4,5]
const itemRefs = []
const calaulate = computed(() => count.value * 2)
const theme = {
  color: 'green'
}
// const color = ref('blue')
const root = ref(null)

const setItemRef = el => {
  if (el) {
    itemRefs.push(el)
  }
}
watch(count, (newVal, oldVal) => {
  console.log('The new counter value is: ' + count.value)
})

onMounted(() => {
  itemRefs.forEach(item => {
    console.log(item)
  })
})

</script>

<template>
  <div>
    <!-- 这里需要有一个根节点，否则router-view transtions 会报错 -->
    <div ref="root">This is a root element</div>
    <h1 class="text" >{{ msg }}</h1>
    <el-input v-model="count" ></el-input>
    <el-input v-model="calaulate" ></el-input>
    <div v-for="item in list" :key="item" :ref="setItemRef">{{item}}</div>
    <button type="button" @click="count++">count is: {{ count }}</button>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}
.text {
  color: v-bind('theme.color');
  /* color: v-bind('color'); */
}
</style>
