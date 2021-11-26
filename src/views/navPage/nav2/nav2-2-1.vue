<template>
  <div>
    这是nav2-2-1页面
  </div>
</template>

<script>
export default {
  name: 'Nav2-2-1'
}
</script>

<script setup >
  import { effectScope } from 'vue'

  const scope = effectScope()

  scope.run(() => {
    const doubled = computed(() => counter.value * 2)
    watch(doubled, () => console.log(doubled.value))

    watchEffect(() => console.log('Count: ', doubled.value))

  })


</script>

<style lang="scss" scoped>

</style>