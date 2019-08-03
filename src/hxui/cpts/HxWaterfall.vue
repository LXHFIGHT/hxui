<template>
  <div class="hx-waterfall" ref="hxWatefall">
    <!-- 瀑布流组件 -->
    <slot></slot>
  </div>
</template>
<script>
export default {
  data () {
    return {
      timer: null,
      timeout: null,
      clientHeight: 0,
      clientWidth: 0,
      lines: 1,
      lineWidth: 0,
      slots: [],
      childrens: [],
      divideWidth: 16 // 间隔大小
    }
  },
  methods: {
    $_getLines () {
      for (let i = 1; i < 10; i++) {
        if (235 * i + (i - 1) * this.divideWidth < this.clientWidth) {
          continue
        }
        this.lines = i
        break
      }
      this.lineWidth = Math.floor((this.clientWidth - (this.lines - 1) * this.divideWidth) / this.lines)
      this.$_initPosition()
    },
    $_doArrange ($child) { // 根据瀑布流规则排序
      let tempIndex = 0
      let min = 10000
      this.slots.forEach((v, i) => {
        if (v < min) {
          min = v
          tempIndex = i
        }
      })
      const height = $child.offsetHeight
      $child.style.top = `${this.slots[tempIndex]}px`
      $child.style.opacity = `1.0`
      $child.style.left = `${this.lineWidth * tempIndex + tempIndex * this.divideWidth}px`
      this.slots[tempIndex] = this.slots[tempIndex] + height + this.divideWidth
    },
    $_initPosition () {
      const { childNodes } = this.$refs.hxWatefall
      this.slots = []
      for (let i = 0; i < this.lines; i++) {
        this.slots.push(0)
      }
      this.timeout = window.setTimeout(() => {
        for (let i = 0; i < childNodes.length; i++) {
          childNodes[i].style.width = `${this.lineWidth}px`
          childNodes[i].style.position = `absolute`
          this.$_doArrange(childNodes[i])
        }
        window.clearTimeout(this.timeout)
      }, 50)
    },
    $_init () {
      const $view = this.$refs.hxWatefall
      this.clientHeight = $view.clientHeight
      this.clientWidth = $view.clientWidth
      this.$_getLines()
    }
  },
  mounted () {
    this.$_init()
    this.timer = window.setInterval(() => {
      this.$_init()
    }, 250)
  },
  beforeDestroy () {
    window.clearInterval(this.timer)
    window.clearTimeout(this.timeout)
  }
}
</script>
<style lang="scss" scoped>
@import "./../scss/variable.scss";
.hx-waterfall {
  height: 100%;
  width: 100%;
  display: block;
  top: 0;
  left: 0;
  position: relative;
  > div {
    opacity: .0;
    transition: all .2s;
  }
}
</style>
