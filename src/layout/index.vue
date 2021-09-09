<script setup >
import mainView from './components/mainView.vue'
import sideBar from './components/sidebar.vue'

</script>

<template>
  <div class="app-wrap" >
    <sideBar class="aside"></sideBar>
    <div class="app-main" >
      <div class="main-header" >main-header</div>
      <mainView class="main-wrap"></mainView>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  $aside-width: 230px;
  .app-wrap {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .aside {
    width: $aside-width;
    height: 100%;
  }
  .app-main {
    width: 100%;
    height: 100%;
    .main-header{
      width: 100%;
      height: 65px;
      display: flex;
      align-items: center;
    }
    .main-wrap {
      width: 100%;
      height: calc(100% - 65px)
    }
  }
  
</style>