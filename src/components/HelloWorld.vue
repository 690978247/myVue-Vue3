<template>
  <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column label="Date" width="120">
      <template #default="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column property="name" label="Name" width="120" />
    <el-table-column property="address" label="Address" show-overflow-tooltip />
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection"
      >Toggle selection status of second and third rows</el-button
    >
    <el-button @click="clearSelection">Clear selection</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'


const multipleTableRef = ref()
const multipleSelection = ref([])
const toggleSelection = () => {
    multipleTableRef.value.toggleRowSelection(tableData.value[0], true)
    
}

const clearSelection = () => {
  multipleTableRef.value.clearSelection()
}
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}
  onMounted(() => {
    nextTick(() => {
      multipleTableRef.value.toggleRowSelection(tableData.value[1], undefined)
    })
  })

const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
])
</script>
