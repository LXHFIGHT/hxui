<template>
  <div :class="['hx-pad-loading', 
    align,
    breathing && 'breathing',
    inline && 'inline',
    direction === 'row' ? 'row' : 'column']" 
    ref="padLoadingIcon">
    <canvas :style="`height: ${height || iconSize}; width: ${height || iconSize};`" :id="id" :class="`hx-loading-canvas`"></canvas>
    <span :class="['text-loading']" :style="textStyle">
      <slot></slot>
    </span>
  </div>
</template>

<script>
import { levelFilter, levelKeys } from '../../const'
export default {
  name: 'hx-loading-icon',
  data () {
    return {
      gap: 0.05,
      canvas: null,
      id: '',
      ctx: null,
      clientHeight: 0,
      clientWidth: 0,
      radius: 0,
      startAngle: 0,
      endAngle: 0,
      timer: null,
      mainColor: ''
    }
  },
  props: {
    height: { // 准备弃用
      type: String
    },
    iconSize: {
      type: String,
      default: '34px'
    },
    textSize: { // 文字大小
      type: String,
      default: '14px'
    },
    level: {
      type: String,
      validator (data) {
        return levelKeys.includes(data)
      },
      default: ''
    },
    color: {
      type: String,
      default: '#235DFF' // 主题色
    },
    breathing: {
      type: Boolean, // 是否带有呼吸动画 
      default: false
    },
    inline: {
      type: Boolean, // 是否属于行内元素 true为是  默认不是
      default: false
    }, 
    align: {
      type: String,
      validator (val) {
        return ['left', 'center', 'right'].includes(val)
      }
    },
    direction: { // 加载中文本和加载动画的布局方式，分别有 “row 在同一行” 以及 “column 在同一列（默认）”
      type: String,
      validator (data) {
        return ['row', 'column'].includes(data)
      },
      default: 'row' // 默认是同一行内
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
      this.mainColor = this.level ? levelFilter(this.level, 'color') : this.color
      this.ctx.strokeStyle = this.mainColor
      this.$_drawArc()
      this.$_setTimer()
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
    },
    $_poptips () {
      if (this.direction === 'column' && ['left', 'right'].includes(this.align)) {
        console.warn('[HXUI HxLoading] 当 direction 设置为 "column" 时，align设置为 "left" 和 "right" 是无效的')
      }
    }
  },
  created () {
    this.id = `canvas-${Math.random() * 100000}`
  },
  mounted () {
    this.$_init()
    this.$_poptips()
  },
  beforeDestroy () {
    window.clearInterval(this.timer)
  },
  computed: {
    textStyle () {
      let style = `color: ${this.mainColor}; ${this.textSize ? ('font-size: ' + this.textSize) : ''}`
      return style
    }
  }
}
</script>
