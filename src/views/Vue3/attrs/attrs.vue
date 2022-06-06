<template>
  <div class="a" >
    A组件  <el-input v-model="data.a" />
    <b-component :data="data" title="AAA" @changeData="changeData" />
  </div>
</template>

<script setup >
import { ref } from 'vue'
import BComponent from './components/BComponent.vue'

const data = ref({
  a: 'Hello',
  b: 'World'
})

const changeData = (val) => {
  data.value.a = val
}


</script>

<style lang="scss" scoped>
.a {
  color: red;
  border: 1px solid red;
}
</style>
