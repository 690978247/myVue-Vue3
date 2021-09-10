<template>
    <div v-if="!item.hidden">
      <template v-if="item.children && item.children.length !== 0" >
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
      <template v-else >
        <el-menu-item :index="resolvePath(item.path)">
          <i :class="item.meta.icon ? item.meta.icon : ''" ></i>
          <span>{{item.meta.title}}</span> 
        </el-menu-item>
      </template>
    </div>
</template>

<script setup >
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

  console.log(props.basePath)
  const isExternal = function(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
  }

  const resolvePath = function(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(props.basePath)) {
        return props.basePath
      }
      return props.basePath
    }


</script>

<style>

</style>