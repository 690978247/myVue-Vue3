<template>
  <div class="a" >
    父组件
    <b-component />
    <c-component />
    <d-component />
  </div>
</template>

<script setup >
import { ref, inject } from 'vue'
import BComponent from './components/BComponent.vue'
import CComponent from './components/CComponent.vue'
import DComponent from './components/DComponent.vue'

const data = ref({
  a: 'Hello',
  b: 'World',
  count: 1
})
const mitt = inject('$mitt')


const handleClick = () => {
  data.value.count++
  mitt.emit('handleClick', data.value)
}


</script>

<style lang="scss" scoped>
.a {
  color: red;
  border: 1px solid red;
}
</style>
