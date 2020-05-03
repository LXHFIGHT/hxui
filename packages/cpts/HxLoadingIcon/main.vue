<template>
  <div :class="['pad-loading-icon', 
    position, 
    direction === 'row' ? 'row' : 'column']" 
    ref="padLoadingIcon"
    :style="`height: ${height};`">
    <canvas :id="id" :class="`hx-loading-canvas`"></canvas>
    <span class="text-loading" :style="textStyle">
      <slot></slot>
    </span>
  </div>
</template>

<script>
import { levelFilter, levelKeys } from './../../const'
export default {
  name: 'hx-loading-icon',
  data () {
    return {
      gap: 0.05,
      canvas: null,
      id: '',
      mainColor: '',
      ctx: null,
      clientHeight: 0,
      clientWidth: 0,
      radius: 0,
      startAngle: 0,
      endAngle: 0,
      timer: null
    }
  },
  props: {
    height: {
      type: String,
      default: '100%'
    },
    level: {
      type: String,
      validator (data) {
        return levelKeys.includes(data)
      },
      default: 'info'
    },
    color: {
      type: String
    },
    position: {
      type: String
    },
    direction: { // 加载中文本和加载动画的布局方式，分别有 “row 在同一行” 以及 “column 在同一列（默认）”
      type: String,
      validator (data) {
        return ['row', 'column'].includes(data)
      },
      default: 'column'
    }
  },
  methods: {
    $_init () {
      const padLoadingIcon = this.$refs.padLoadingIcon
      this.clientWidth = padLoadingIcon.clientWidth
      this.clientHeight = padLoadingIcon.clientHeight
      this.radius = this.clientHeight / 2
      this.canvas = document.getElementById(this.id)
      this.canvas.height = this.clientHeight
      this.canvas.width = this.clientHeight
      this.startAngle = 0
      this.endAngle = Math.PI * 0.5
      this.ctx = this.canvas.getContext('2d')
      this.ctx.lineWidth = 2
      this.ctx.lineCap = 'round'
      this.mainColor = this.color || levelFilter(this.level, 'color')
      this.ctx.strokeStyle = this.mainColor
    },
    $_drawArc () {
      this.ctx.clearRect(0, 0, this.clientWidth, this.clientWidth)
      this.ctx.beginPath()
      // 此处注意半径需要减去线条宽度的一半
      this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, (this.radius - this.ctx.lineWidth), this.startAngle, this.endAngle)
      this.ctx.stroke()
      this.ctx.closePath()  
    },
    $_setTimer () {
      let isStarting = true
      let next = 0
      this.timer = window.setInterval(() => {
        if (isStarting) {
          if (this.startAngle >= this.endAngle) {
            isStarting = false
            next = this.endAngle + Math.PI * 1.5
          } else {
            this.startAngle = this.startAngle + this.gap > this.endAngle ? this.endAngle : this.startAngle + this.gap
          }
        } else {
          if (this.endAngle >= next) {
            isStarting = true
          } else {
            this.endAngle = this.endAngle + this.gap > next ? next : this.endAngle + this.gap
          }
        }
        this.$_drawArc()
      }, 1000 / 60)
    }
  },
  created () {
    this.id = `canvas-${Math.random() * 100000}`
  },
  mounted () {
    this.$_init()
    this.$_drawArc()
    this.$_setTimer()
  },
  beforeDestroy () {
    window.clearInterval(this.timer)
  },
  computed: {
    textStyle () {
      let style = `color: ${this.mainColor}; `
      if (this.direction === 'row') {
        style += `height: ${this.height}; line-height: ${this.height}; `
      } else {
        style += `margin-top: ${parseInt(this.clientHeight / 3)}px;`
      }
      return style
    }
  }
}
</script>
