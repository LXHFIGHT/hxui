<template>
  <div ref="folder"
    :class="['hx-folder', show ? 'show' : '']"
    :style="styles">
    <div class="mask" @click="doClick"></div>
    <div class="pad-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { 
  getElementToPageTop, 
  getElementToPageLeft, 
  getElementScrollTop 
} from './../../tools/dom'
import { MOBILE_DEVICE_MAX_WIDTH } from './../../const'
export default {
  data () {
    return {
      MOBILE_DEVICE_MAX_WIDTH,
      styles: '', // 样式集合
      screenWidth: 0,
      left: 0,
      top: 0,
      domHeight: 0,
      domWidth: 0,
      folderWidth: 0,
      scroll: 0,
      timer: null
    }
  },
  props: {
    dom: { // 需要依附的组件DOM对象
      type: Object
    },
    minWidth: { // 定义最小宽度
      type: String,
      default: '200px'
    },
    show: { // 是否需要展示出来
      type: [String, Boolean, Number],
      default: false
    },
    onHide: { // 在移动端，将该组件隐藏的方法
      type: Function,
      default: () => {
        return () => {}
      }
    }
  },
  methods: {
    $_initPosition () {
      this.$nextTick(() => {
        const $folder = this.$refs.folder
        const body = document.querySelector('body')
        if (body.append) {
          body.append($folder)
        } else {
          body.appendChild($folder)
        }
      })
    },
    $_renderLayout () {
      if (!this.dom) {
        return
      }
      const $view = this.dom
      const domHeight = $view.clientHeight
      const $folder = this.$refs.folder
      this.folderWidth = $folder.clientWidth
      this.domWidth = $view.clientWidth
      this.left = getElementToPageLeft($view) - (this.folderWidth - this.domWidth) / 2
      this.top = getElementToPageTop($view) + domHeight + 16
      this.scroll = getElementScrollTop($view)
      this.$_setStyles()
    },
    $_setStyles () {
      const left = this.left ? `left: ${this.left}px;` : ''
      const top = this.top ? `top: ${this.top}px;` : ''
      const width = this.domWidth ? `width: ${this.domWidth}px;` : ''
      const transform = this.left ? `transform: translateY(${-1 * this.scroll}px);` : ''
      const minWidth = `min-width: ${this.minWidth};`
      this.styles = (left + top + width + transform + minWidth)
    },
    doClick () {
      if (this.screenWidth > MOBILE_DEVICE_MAX_WIDTH) {
        return
      }
      this.onHide()
    }
  },
  mounted () {
    this.screenWidth = document.body.clientWidth
    this.$_initPosition()
    if (this.screenWidth <= MOBILE_DEVICE_MAX_WIDTH) {
      return
    }
    this.$_renderLayout()
    this.timer = window.setInterval(() => {
      this.$_renderLayout()
    }, 1000 / 60)
  },
  beforeDestroy () {
    window.clearInterval(this.timer)
    const body = document.querySelector('body')
    this.$refs.folder && body.removeChild(this.$refs.folder)
  },
  destroyed () {
    this.$destroy(true)
  }
}
</script>
