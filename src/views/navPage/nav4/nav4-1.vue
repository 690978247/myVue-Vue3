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
  let options = {
    series: [
      {
        type: 'gauge',
        progress: {
          show: true,
          width: 18
        },
        axisLine: {
          lineStyle: {
            width: 18
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          length: 15,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        axisLabel: {
          distance: 25,
          color: '#999',
          fontSize: 20
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 25,
          itemStyle: {
            borderWidth: 10
          }
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          fontSize: 80,
          offsetCenter: [0, '70%']
        },
        data: [
          {
            value: 70
          }
        ]
      }
    ]
  }
  myChart.setOption(options)
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