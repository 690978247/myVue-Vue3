<template>
  <div class="b" >
    B组件 A组件的值{{attrs.data.a}}
    <c-component v-bind="$attrs" title="B" />
  </div>
</template>

<script setup >
import { useAttrs } from "vue"
import CComponent from './CComponent.vue'
// const props = defineProps(
//   {
//     data: {
//       type: Object,
//       default: () => {}
//     }
//   }
// )

// useAttrs父组件传递过来的，除了props属性之外的所有属性集合

const attrs = useAttrs()
// debugger

</script>

<style lang="scss" scoped>
.b {
  color: blue;
  border: 1px solid blue;;
}
</style>
