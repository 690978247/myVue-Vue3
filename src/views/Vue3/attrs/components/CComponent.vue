<template>
  <div class="c" >
    C组件 A组件的值{{attrs.title}}
    <d-component v-bind="$attrs" />
  </div>
</template>

<script setup >
import { useAttrs } from "vue"
import DComponent from './DComponent.vue'
const props = defineProps(
  {
    title: {
      type: String,
      default: ''
    }
  }
)

const attrs = useAttrs()


</script>

<style lang="scss" scoped>
.c {
  color: green;
  border: 1px solid green;
}
</style>
