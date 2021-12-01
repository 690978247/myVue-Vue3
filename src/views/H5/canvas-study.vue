<template>
  <div>
    <canvas id="tutorial" width="150" height="150"></canvas>
  </div>
</template>

<script>
export default {
  name: 'CanvasStudy',
  data () {
    return {
    }
  },
  mounted () {
    this.draw()
  },
  methods: {
    draw () {
      var canvas = document.getElementById('tutorial')
        if (canvas.getContext){
          var ctx = canvas.getContext('2d');
        }
    },
  }
}
</script>

<style lang="scss" scoped>
canvas {
   border: 1px solid black; 
}
</style>