<template>
  <div class="c" >
    同级子组件-C
    Bcount: {{BCount}}
    Ccount: {{CCount}}
    Dcount: {{DCount}}
     <el-button @click="handlecLick"  size="mini" >点击</el-button>
  </div>
</template>

<script setup >
import { ref, inject } from 'vue'

const mitt = inject('$mitt')
const BCount = ref(0)
const CCount = ref(0)
const DCount = ref(0)

mitt.on('handleBCLick', (val) => {
  BCount.value = val
})

</script>

<style lang="scss" scoped>
.c {
  color: green;
  border: 1px solid green;
}
</style>
