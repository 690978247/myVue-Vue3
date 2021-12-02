<template>
  <div class="box" id="box" @mousewheel.prevent="wheelZoom($event)">
      <svg class="wrap" :style="styleObj" ref="svg" @mousedown="handleMouseDown" @mouseup="handleMouseUp" >
        <g v-for="(item, index) in dots" :key="index" class="block" >
          <circle :cx="item.x" :cy="item.y" :r="item.r" @click="clickData(item)" :stroke="item.color" stroke-width="1" :fill="item.color"/>
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
      scaleValue: 1,
      pos: {
        top: 0,
        left: 0
      },
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
  computed: {
    styleObj () {
      return {
        transform: `scale(${this.scaleValue})`,
        top: this.pos.top,
        left: this.pos.left
      }
    },
  },
  methods: {
    clickData(item) {
      item.r = 10
    },
    handleMouseDown (e) {
      let startY = e.clientY
      let startX = e.clientX
      let startTop = this.pos.top
      let startLeft = this.pos.left
      let $this = this
      let move = moveEvent => {
        // !#zh 移动的时候，不需要向后代元素传递事件，只需要单纯的移动就OK
        moveEvent.stopPropagation()
        moveEvent.preventDefault()
        let currX = moveEvent.clientX
        let currY = moveEvent.clientY
        $this.pos.top = currY - startY + startTop
        $this.pos.left = currX - startX + startLeft
        $this.$refs.svg.top = $this.pos.top + 'px'
        $this.$refs.svg.left = $this.pos.left + 'px'
      }
      let up = () => {
        document.removeEventListener('mousemove', move, true)
        document.removeEventListener('mouseup', up, true)
      }
      document.addEventListener('mousemove', move, true)
      document.addEventListener('mouseup', up, true)
      return true
    },
    wheelZoom(e) {
      if (e.wheelDelta > 0) {
        this.scaleValue += 0.2
      } else {
        if (this.scaleValue <= 0.2) {
          this.scaleValue = 0.2
        } else {
          this.scaleValue -= 0.2
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 800px;
  height: 500px;
  overflow: hidden;
  border: 1px solid #ccc;
  position: relative;
}
.wrap {
  width: 800px;
  height: 500px;
  position: absolute;
  background: url('../../assets/404_images/404.png') no-repeat;
  background-size: 100%;
  overflow: hidden;
  cursor: move;
}
.block {
  position: relative;
}
</style>