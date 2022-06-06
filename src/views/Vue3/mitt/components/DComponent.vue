<template>
  <div class="d">
    同级子组件-D
    Bcount: {{BCount}}
    Ccount: {{CCount}}
    Dcount: {{DCount}}
     <el-button @click="handlecLick" size="mini" >点击</el-button>
  </div>
</template>

<script setup >
import { ref, inject } from 'vue'

const BCount = ref(0)
const CCount = ref(0)
const DCount = ref(0)

const mitt = inject('$mitt')

</script>

<style lang="scss" scoped>
.d {
  color: purple;
  background: 1px solid purple;
}
</style>
