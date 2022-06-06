<template>
  <div class="a" >
    MessageBox 组件
    <hr />
    <div @click="handleClick" >点击</div>
    <hr />
    <div @click="handleClick2" >点击2</div>

  </div>
</template>

<script setup >
import { getCurrentInstance, inject } from 'vue'
import { ElMessage } from 'element-plus'
const { $confirm, confirm_Pop } =  getCurrentInstance().appContext.config.globalProperties
const $confirm_Pop = inject('confirm_Pop')

const handleClick = () => {
  $confirm('测试测试测试', '标题', {
    confirmButtonText: 'OK',
    callback: (action) => {
      ElMessage({
        type: 'info',
        message: `action: ${action}`,
      })
    }
  })
}

const handleClick2 = () => {
  $confirm_Pop('是否确认？', function () {
    console.log('确认')
  })
}

</script>

<style lang="scss" scoped>
</style>
