<template>
  <div>
    <el-button @click="print" >打印</el-button>
    <!--startprint-->
      <div id="printContent">
        <img src="../../../assets/logo.png" alt="">
      </div>
      <div ref="myChart" id="main" style="width: 600px;height:400px;"></div>
    <!--endprint-->

  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue'
// export default {
//   name: 'Nav4-1',
//   data () {
//     return {
//       echart: ''
//     }
//   },
//   methods: {
//     print() {
//       // console.log(window.document)
//       let oldStr = window.document.body.innerHTML
//       let start = "<!--startprint-->" // 开始打印标识, 17个字符
//       let end = "<!--endprint-->" // 结束打印标识
//       let newStr = oldStr.substr(oldStr.indexOf(start) + 17) // 截取开始打印标识之后的内容
//       newStr = newStr.substring(0, newStr.indexOf(end)) 
//       window.document.body.innerHTML = newStr;
//       window.print()
//       window.document.body.innerHTML = oldStr;
//     },
//   }
// }
let myChart = ref('')

onMounted(() => {
  initChart()
})

const initChart = () => {
  myChart = echarts.init(document.getElementById("main"));
  myChart.setOption({
      title: { text: "总用户量" },
      tooltip: {},
      xAxis: {
        data: ["12-3", "12-4", "12-5", "12-6", "12-7", "12-8"],
      },
      yAxis: {},
      series: [
        {
          name: "用户量",
          type: "line",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    })
}

const print = () => {
  let oldStr = window.document.body.innerHTML
  let start = "<!--startprint-->" // 开始打印标识, 17个字符
  let end = "<!--endprint-->" // 结束打印标识
  let newStr = oldStr.substr(oldStr.indexOf(start) + 17) // 截取开始打印标识之后的内容
  newStr = newStr.substring(0, newStr.indexOf(end)) 
  window.document.body.innerHTML = newStr;
  window.print()
  window.document.body.innerHTML = oldStr;
}

</script>

<style lang="scss" scoped>

</style>