<template>
  <div>
    <span>这是nav1-3页面, 下面是router-view</span>
    <router-view v-slot="{ Component }" >
      <transition name="fade-transform" mode="out-in">
          <component :is="Component" ></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'Nav1-3'
}
</script>

<style lang="scss" scoped>

</style>