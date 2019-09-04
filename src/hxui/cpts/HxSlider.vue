<template>
  <div :class="['hx-slider', direction]" ref="hxSlider" :style="`height: ${height}`">
    <div class="pad-slider" ref="padSlider" :style="padSliderStyle">
      <!--  HxSlider 为轮播图组件 -->
      <slot></slot>
    </div>
    <button class="btn-to-left">
      <img class="icon" src="./../img/icon/icon-point-down.png" alt="">
    </button>
    <button class="btn-to-right">
      <img class="icon" src="./../img/icon/icon-point-down.png" alt="">
    </button>
    <ul class="pad-indicators" v-if="!hideIndicator">
      <li v-for="(item) in length" 
        :key="item" 
        @mouseenter="index = (item - 1)"
        @click="index = (item - 1)"
        :class="[(indicatorClass || 'item-indicator'), (index + 1 === item || (index === length && item === 1)) && 'selected']">
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      offsetHeight: '',
      offsetWidth: '',
      index: 0,
      length: 0,
      timer: null,
      resetor: null
    }
  },
  props: {
    height: {
      type: String,
      default: '100%'
    },
    during: {
      type: Number,
      default: 5000
    },
    hideIndicator: { // 是否展示轮播页面指示器
      type: Boolean,
      default: false
    },
    indicatorClass: { // 轮播页面指示器的类
      type: String 
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator (val) {
        return ['vertical', 'horizontal'].includes(val)
      }
    }
  },
  methods: {
    $_init () {
      this.offsetHeight = this.$refs.hxSlider.offsetHeight
      this.offsetWidth = this.$refs.hxSlider.offsetWidth
      this.$_initLayout()
    },
    $_initLayout () {
      const isVertical = this.direction === 'vertical'
      const { padSlider } = this.$refs
      this.length = padSlider.children.length
      for (let i = 0; i < this.length; i++) {
        const elem = document.createElement('div')
        elem.classList.add('hx-slider-item')
        if (isVertical) {
          elem.style.height = `${this.offsetHeight}px`
          elem.style.top = `${this.offsetHeight * i}px`
        } else {
          elem.style.width = `${this.offsetWidth}px`
          elem.style.left = `${this.offsetWidth * i}px`
        }
        elem.appendChild(padSlider.children[0])
        this.$refs.padSlider.appendChild(elem)
      }
      const node = this.$refs.padSlider.children[0].cloneNode(true)
      if (isVertical) {
        node.style.top = `${this.offsetHeight * this.length}px`
      } else {
        node.style.left = `${this.offsetWidth * this.length}px`
      }
      this.$refs.padSlider.appendChild(node)
      this.timer = window.setInterval(() => {
        this.toNext()
      }, this.during)
    },
    toNext () {
      if (this.index < this.length) {
        this.index++
      } else {
        this.$refs.padSlider.style.transition = 'unset'
        this.index = 0
        this.$forceUpdate()
        this.resetor = window.setTimeout(() => {
          this.$refs.padSlider.style.transition = 'transform .4s'
          this.index += 1
          window.clearTimeout(this.resetor)
        }, 50)
      }
    } 
  },
  mounted () {
    this.$_init()
  },
  beforeDestroy () {
    window.clearInterval(this.timer)
    window.clearTimeout(this.resetor)
  },
  computed: {
    padSliderStyle () {
      if (this.direction === 'vertical') {
        return `transform: translateY(${this.index * this.offsetHeight * -1}px);`
      } else {
        return `transform: translateX(${this.index * this.offsetWidth * -1}px);`
      }
    }
  }
}
</script>
