<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import sidebarItem from './sidebarItem.vue'

const router = useRouter()
const route = computed(() => router.currentRoute.value) 
const routes = computed(() => router.options.routes)
const isCollapse = ref(false)

</script>
<template>
  <div>
    <div class="aside-header" >This is a Logo</div>
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

    <!-- <template v-for="(item,key) in routes" :key="key" >
        <template v-if="!item.hidden" >
          <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path" >
            <template #title >
              <i :class="item.meta.icon ? item.meta.icon : ''" ></i>
              <span>{{item.meta.title}}</span> 
            </template>
            <el-menu-item v-for="(child, key) in item.children" :key="key" :index="item.path + '/' + child.path" >
              {{child.meta.title}}
            </el-menu-item>
          </el-sub-menu>

          <el-menu-item v-else :index="item.redirect" >
            <i :class="item.meta.icon ? item.meta.icon : ''" ></i>
            <template #title >
              <span>{{item.meta.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </template> -->
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