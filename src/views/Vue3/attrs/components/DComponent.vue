<template>
  <div class="d">
    D组件 A组件的值{{attrs.data.a}}
    <span @click="changeData" >点击</span>
    <el-input v-model="attrs.data.a" />
  </div>
</template>

<script setup >
import { useAttrs } from "vue"

const emit = defineEmits(['changeData'])
const attrs = useAttrs()

const changeData = () => {
  emit('changeData', '7777')
}

</script>

<style lang="scss" scoped>
.d {
  color: purple;
  background: 1px solid purple;
}
</style>
