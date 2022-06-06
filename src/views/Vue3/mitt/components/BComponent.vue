<template>
  <div class="b" >
    同级子组件-B 
    Bcount: {{BCount}}
    Ccount: {{CCount}}
    Dcount: {{DCount}}
    <el-button @click="handleBCLick"  size="mini" >点击</el-button>
  </div>
</template>

<script setup >
import { ref, inject } from 'vue'

const mitt = inject('$mitt')
const BCount = ref(0)
const CCount = ref(0)
const DCount = ref(0)

const handleBCLick = () => {
  BCount.value++
  mitt.emit('handleBCLick', BCount.value)
}

</script>

<style lang="scss" scoped>
.b {
  color: blue;
  border: 1px solid blue;;
}
</style>
