<template>
    <template v-if="!item.hidden">
      <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)" >
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
            <i v-if="onlyOneChild.meta.icon" :class="onlyOneChild.meta.icon ? onlyOneChild.meta.icon : ''" ></i>
            <span v-if="onlyOneChild.meta.title" >{{onlyOneChild.meta.title}}</span> 
        </el-menu-item>
      </template>

      <template v-else >
        <el-sub-menu :index="resolvePath(item.path)" popper-append-to-body>
          <template #title>
            <i :class="item.meta.icon ? item.meta.icon : ''" ></i>
            <span>{{item.meta.title}}</span>
          </template>

          <sidebar-item
            v-for="child in item.children"
            :key="child.path"
            :item="child"
            :base-path="resolvePath(child.path)"
          />
        </el-sub-menu>
      </template>
    </template>
</template>

<script setup >
import path from "path-browserify";
import { useRouter } from 'vue-router'
import { ref } from 'vue'
  const props = defineProps({
    // route object
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  })

  const onlyOneChild = ref(null)

  const hasOneShowingChild = (children = [], parent) => {
    const showingChildren = children.filter((item) => {
      if (item.hidden) {
        return false
      } else {
        // Temp set(will be used if only has one showing child)
        onlyOneChild.value = item
        return true
      }
    })

    if (showingChildren.length === 1) {
      return true
    }

    if (showingChildren.length === 0) {
      onlyOneChild.value = { ...parent, noShowingChildren: true }
      return true
    }
    return false
  }

  const isExternal = function(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
  }
  const router = useRouter()
  const resolvePath = function(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(props.basePath)) {
        return props.basePath
      }
      let routes = router.getRoutes()
      routes.forEach(item => {
        let path = item.path.substr(item.path.lastIndexOf("/") + 1)
        if (path === routePath) {
          routePath = item.path
        }
      })
      return routePath
    // return path.resolve(props.basePath, routePath)
    }


</script>

<style>

</style>