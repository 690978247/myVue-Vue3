<template>
  <div>
    <canvas class="wrap" id="myCanvas" width="800" height="500" ></canvas>
    <br />
    <div>

    </div>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  name: 'Canvas',
  data () {
    return {
      dots: [
        {
          x: 180,
          y: 300,
          r: 4,
          color: '#D9001B',
        },
        {
          x: 220,
          y: 310,
          r: 4,
          color: '#FFFF00',
        },
        {
          x: 60,
          y: 130,
          r: 4,
          color: '#D9001B',
        },
        {
          x: 160,
          y: 380,
          r: 4,
          color: '#D9001B',
        },
        {
          x: 250,
          y: 150,
          r: 4,
          color: '#FFFF00'
        }
      ],
      arr:['1','2','3','4']
    }
  },
  mounted () {
    this.arr.push(_.uniqueId(this.arr))
    console.log('lllllllllllllll', this.arr)
    this.draw()
  },
  methods: {
    draw () {
      let c = document.getElementById("myCanvas");
      let cxt = c.getContext("2d");
      cxt.fillStyle = "#FF0000";
      cxt.beginPath();
      cxt.arc(70, 18, 4, 0, Math.PI*2, true);
      cxt.closePath();
      cxt.fill();
    },
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  /* 注意： width和height在此处定义会扭曲画布内容，最好在canvas标签上面设置宽高 */
  border: 1px solid #ccc;
  background: url('../../assets/404_images/404.png') no-repeat;
  background-size: 100%;
}
</style>