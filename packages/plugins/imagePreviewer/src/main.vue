<template>
  <div :class="['hx-image-modal hx-modal', (show ? 'show' : ''), position]"
    @mousedown="doMouseDown"
    @mousemove="doMouseMove"
    @mouseup="doMouseUp"
    @touchstart="doTouchDown"
    @touchend="doTouchUp"
    @touchmove="doTouchMove">
    <div class="mask" @click="doQuitPreview"></div>
    <header class="navbar">
      <span class="title" v-text="`${index + 1} / ${urls.length}`"></span>
      <button class="btn-quit-preview" @click="doQuitPreview"></button>
    </header>
    <img class="modal-image-preview"
      ref="imageElem"
      ondragstart="return false;"
      :src="current"
      :style="`margin-top: ${matrix.y}px; margin-left: ${matrix.x}px;`"
      alt="image"/>
    <button v-if="urls.length > 1 && index"
      @click="toLastImage"
      class="btn-to-last hide-sm">
      <IconLeft class="icon"></IconLeft>
    </button>
    <button v-if="urls.length > 1 && index !== urls.length - 1"
      @click="toNextImage"
      class="btn-to-next hide-sm">
      <IconRight class="icon"></IconRight>
    </button>
    <div class="pad-functions">
      <button v-if="urls.length > 1 && index"
        @click="toLastImage"
        class="btn-to-last hide-md hide-bg">
        <IconLeft class="icon"></IconLeft>
      </button>
      <button @click="doZoomIn" class="btn-function">
        <IconZoomIn class="icon"></IconZoomIn>
      </button>
      <button @click="doZoomOut" class="btn-function">
        <IconZoomOut class="icon"></IconZoomOut>
      </button>
      <button @click="doRotateLeft" class="btn-function">
        <IconRotateLeft class="icon"></IconRotateLeft>
      </button>
      <button @click="doRotateRight" class="btn-function">
        <IconRotateRight class="icon"></IconRotateRight>
      </button>
      <button class="btn-function" 
        @click="doDownload(current)">
        <IconDownload class="icon"></IconDownload>
      </button>
      <button v-if="urls.length > 1 && index !== urls.length - 1"
        @click="toNextImage"
        class="btn-to-next hide-md hide-bg">
        <IconRight class="icon"></IconRight>
      </button>
    </div>
  </div>
</template>
<script>
import toast from './../../toast'
import IconLeft from './../../../img/svg/left.svg'
import IconRight from './../../../img/svg/right.svg'
import IconZoomIn from './../../../img/svg/zoom-in.svg'
import IconZoomOut from './../../../img/svg/zoom-out.svg'
import IconRotateLeft from './../../../img/svg/rotate-left.svg'
import IconRotateRight from './../../../img/svg/rotate-right.svg'
import IconDownload from './../../../img/svg/download.svg'
export default {
  data () {
    return {
      current: '',
      urls: [],
      show: false,
      listener: null, // 添加的监听回退事件
      position: '', // 图片预览模块框显示位置，可选 left（左半屏）， right（右半屏）
      index: 0,
      scale: 1.0,
      maxScale: 2.5,
      degree: 0,
      closeTimer: null,
      isMobile: false,
      animationFrameInt: null,
      matrix: {
        pageX: 0,
        pageY: 0,
        startX: 0,
        startY: 0,
        x: 0,
        y: 0,
        isMoving: false
      }
    }
  },
  components: {
    IconLeft,
    IconRight,
    IconZoomIn,
    IconZoomOut,
    IconRotateLeft,
    IconRotateRight,
    IconDownload
  },
  methods: {
    $_init () {
      this.show = true
      this.isMobile = document.body.offsetWidth < 640
      this.index = this.$_getCurrentImageIndex()
    },
    // 销毁组件
    destroyElement () {
      this.show = false
      this.closeTimer = setTimeout(() => {
        window.removeEventListener('popstate', this.listener)
        this.$destroy(true)
        this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
      }, 400)
    },
    $_getCurrentImageIndex () {
      const { urls, current } = this
      for (let i = 0; i < urls.length; i++) {
        if (urls[i] === current) {
          return i
        }
      }
    },
    $_reset () {
      this.animationFrameInt = null
      this.scale = 1.0
      this.degree = 0
      window.cancelAnimationFrame(this.animationFrameInt)
      const recover = () => {
        if (this.matrix.x <= 1 || this.matrix.y <= 1) {
          this.matrix.x = 0
          this.matrix.y = 0
          this.matrix.startX = 0
          this.matrix.startY = 0
          window.cancelAnimationFrame(this.animationFrameInt)
        } else {
          this.matrix.x -= this.matrix.x / 6
          this.matrix.y -= this.matrix.y / 6
          this.animationFrameInt = window.requestAnimationFrame(recover)
        }
      }
      recover()
    },
    $_transform () {
      const { degree, scale } = this
      this.$refs.imageElem.style.transform = `translate(-50%, -50%) rotate(${degree}deg) scale(${scale}, ${scale})`
    },
    $_adjustScale (isZoomIn) {
      let { scale, maxScale } = this
      if (isZoomIn) {
        if (this.scale < maxScale) {
          scale += 0.5
        } else {
          toast.warn('不能再放大了')
        }
      } else {
        if (scale > 1.0) {
          scale -= 0.5
        } else {
          toast.warn('不能再缩小了')
        }
      }
      this.scale = scale
      this.$_transform()
    },
    $_rotate (isRotateRight) {
      const { degree } = this
      const { imageElem } = this.$refs
      isRotateRight ? (this.degree = degree + 90) : (this.degree = degree - 90)
      imageElem.style.top = '50%'
      imageElem.style.left = '50%'
      this.$_transform()
    },
    $_switchImage (isToLast) {
      const { index, urls } = this
      if (isToLast) {
        this.index = index - 1
      } else {
        this.index = index + 1
      }
      this.current = urls[this.index]
      this.$_reset()
    },
    toLastImage () {
      this.$_switchImage(true)
    },
    toNextImage () {
      this.$_switchImage(false)
    },
    // 退出预览
    doQuitPreview () {
      this.destroyElement()
    },
    doRotateLeft () {
      this.$_rotate(false)
    },
    doRotateRight () {
      this.$_rotate(true)
    },
    doZoomIn () {
      this.$_adjustScale(true)
    },
    doZoomOut () {
      this.$_adjustScale(false)
    },
    doTouchImage () {
    },
    doMouseDown () {
      const { pageX, pageY } = event
      this.matrix = Object.assign({}, this.matrix, {
        isMoving: true,
        pageX, 
        pageY
      })
    },
    doMouseUp () {
      this.matrix = Object.assign({}, this.matrix, {
        isMoving: false,
        startX: this.matrix.x,
        startY: this.matrix.y
      })
    },
    doMouseMove () {
      if (this.matrix.isMoving) {
        const { pageX, pageY } = event
        this.matrix = Object.assign({}, this.matrix, {
          x: this.matrix.startX + pageX - this.matrix.pageX,
          y: this.matrix.startY + pageY - this.matrix.pageY
        })
      }
    },
    doTouchDown () {
      const { pageX, pageY } = event.targetTouches[0]
      this.matrix = Object.assign({}, this.matrix, {
        isMoving: true,
        pageX, 
        pageY
      })
    },
    doTouchUp () {
      this.matrix = Object.assign({}, this.matrix, {
        isMoving: false,
        startX: this.matrix.x,
        startY: this.matrix.y
      })
    },
    doTouchMove () {
      if (this.matrix.isMoving) {
        const { pageX, pageY } = event.changedTouches[0]
        this.matrix = Object.assign({}, this.matrix, {
          x: this.matrix.startX + pageX - this.matrix.pageX,
          y: this.matrix.startY + pageY - this.matrix.pageY
        })
      }
    },
    doDownload (src) {
      window.open(src, '_blank')
    }
  },
  mounted () {
    this.$_init()
  },
  beforeDestroy () {
    clearTimeout(this.closeTimer)
  }
}
</script>
