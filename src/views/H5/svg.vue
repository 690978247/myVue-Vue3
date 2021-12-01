<template>
  <div>
    <svg class="wrap">
      <g v-for="(item, index) in dots" :key="index" class="block">
        <circle :cx="item.x" :cy="item.y" :r="item.r" @click="clickData(item)" :stroke="item.color" stroke-width="1" :fill="item.color" />
      </g>

      <!-- 高斯模糊 filter链接id-->
      <!-- <defs>
        <filter id="f1" x="0" y="0">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
        </filter>
      </defs>
      <rect width="90" height="90" x="150" stroke="green" stroke-width="3" fill="yellow" filter="url(#f1)" /> -->

      <!-- feOffset -->
      <!-- <defs>
        <filter id="f2" x="0" y="0" width="200%" height="200%" >
          <feOffset result="offOut" in="SourceGraphic" dx="20" dy="20" />
          <feBlend in="SourceGraphic" in2="offOut" mode="normal" />
        </filter>
      </defs>
      <rect width="90" height="90" stroke="green" stroke-width="3" fill="yellow" filter="url(#f2)" /> -->

    </svg>
  </div>
</template>

<script>
export default {
  name: 'SVG',
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
      ]
    }
  },
  methods: {
    clickData(item) {
      item.r = 10
    },
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 800px;
  height: 500px;
  border: 1px solid #ccc;
  background: url('../../assets/404_images/404.png') no-repeat;
  background-size: 100%;
}
.block {
  position: relative;
}
</style>