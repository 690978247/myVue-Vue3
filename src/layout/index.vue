<template>
  <div class="app-wrap" >
    <sideBar :class="classObj" class="aside"></sideBar>
    <div class="app-main" >
      <div class="main-header" >
        <el-icon :size="30" @click="toggleMenu" :class="{ 'iconRotate' : isRotate}" >
          <Fold />
        </el-icon>
      </div>
      <mainView class="main-wrap"></mainView>
    </div>
  </div>
</template>

<script setup >
import mainView from './components/mainView.vue'
import sideBar from './components/sidebar.vue'
import { Fold } from '@element-plus/icons'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()

const isRotate = computed(() => store.state.sideBar.opened)
const classObj = computed(() => ({
  openSidebar: store.state.sideBar.opened
}))

const toggleMenu = () => {
  store.dispatch('toggleSidebar')
}


</script>


<style lang="scss" scoped>
  $aside-width: 230px;
  .app-wrap {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .aside {
    width: $aside-width;
    min-width: $aside-width;
    height: 100%;
    background: #545C64;
    transition: all .5s;
    color: #fff;
    overflow: hidden;
  }
  .app-main {
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    .main-header{
      width: 100%;
      height: 65px;
      background: #545C64;
      display: flex;
      align-items: center;
      color: #fff
    }
    .main-wrap {
      width: 100%;
      padding: 10px;
      height: calc(100% - 65px);
      box-sizing: border-box;
    }
  }
  .openSidebar {
    width: 70px;
    min-width: 70px;
    transition: all .5s;
  }

  .iconRotate {
    transform: rotate(180deg);
  }
  
</style>