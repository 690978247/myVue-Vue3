<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import sidebarItem from './sidebarItem.vue'

const router = useRouter()
const route = computed(() => router.currentRoute.value) 
const routes = computed(() => router.options.routes)
const store = useStore()

const isCollapse = computed(() => {
  return store.state.sideBar.opened
})

</script>
<template>
  <div>
    <div class="aside-header" v-if="!isCollapse"  >This is a Logo</div>
    <el-menu
      :default-active="route.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      router
      :collapse="isCollapse"
      active-text-color="#ffd04b"
      style="border: 1px solid #545c64"
    >
    
    <sidebarItem v-for="route in routes" :item="route" :key="route.path" :base-path="route.path" />
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.aside-header {
  width: 100%;
  height: 65px;
  line-height: 65px;
  text-align: center;
}
</style>