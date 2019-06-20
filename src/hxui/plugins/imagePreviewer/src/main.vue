<template>
  <div :class="['hx-image-modal hx-modal', (show ? 'show' : ''), position]"
    @mousedown="doMouseDown"
    @mousemove="doMouseMove"
    @mouseup="doMouseUp"
    @touchstart="doTouchImage">
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
            class="btn-to-last hide-sm fa fa-angle-left"></button>
    <button v-if="urls.length > 1 && index !== urls.length - 1"
            @click="toNextImage"
            class="btn-to-next hide-sm fa fa-angle-right"></button>
    <div class="pad-functions">
      <button v-if="urls.length > 1 && index"
              @click="toLastImage"
              class="btn-to-last hide-md hide-bg fa fa-angle-left"></button>
      <button @click="doZoomIn" class="btn-search-plus fa fa-search-plus"></button>
      <button @click="doZoomOut" class="btn-search-minus fa fa-search-minus"></button>
      <button @click="doRotateLeft" class="btn-rotate-left fa fa-undo"></button>
      <button  @click="doRotateRight"
               class="btn-rotate-right fa fa-repeat"></button>
      <a class="btn-download fa fa-download" target="_blank" :href="current" download="图片预览效果.jpg"></a>
      <button v-if="urls.length > 1 && index !== urls.length - 1"
              @click="toNextImage"
              class="btn-to-next hide-md hide-bg fa fa-angle-right"></button>
    </div>
  </div>
</template>
<script>
import toast from './../../toast'
export default {
  data () {
    return {
      current: '',
      urls: [],
      show: false,
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
      const { imageElem } = this.$refs
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
      console.log('LINX', toast.LEVEL_WARNING)
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
      console.log(event)
    },
    doMouseDown () {
      const { pageX, pageY } = event
      this.matrix = {
        ...this.matrix,
        isMoving: true,
        pageX, 
        pageY
      }
    },
    doMouseUp () {
      this.matrix = {
        ...this.matrix,
        isMoving: false,
        startX: this.matrix.x,
        startY: this.matrix.y
      }
    },
    doMouseMove () {
      if (this.matrix.isMoving) {
        const { pageX, pageY } = event
        this.matrix = {
          ...this.matrix,
          x: this.matrix.startX + pageX - this.matrix.pageX,
          y: this.matrix.startY + pageY - this.matrix.pageY
        }
      }
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

<style lang="scss" scoped>
@import './../../../scss/variable.scss';
// 图片预览组件模态框
.hx-image-modal.hx-modal {
  text-align: center;
  overflow: hidden;
  z-index: 1000;
  .mask {
    background-color: rgba(0,0,0,.8);
  }
  &.left, &.right {
    width: 50%;
  }
  &.right {
    right: 0;
    left: unset;
  }
  .navbar {
    width: 100%;
    height: $height-navbar;
    background-color: rgba(255,255,255,.1);
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    text-align: left;
    padding-left: $pm-md;
    z-index: 100;
    transition: background .4s;
    .title {
      color: $color-white;
      line-height: $height-navbar;
    }
    .btn-quit-preview {
      float: right;
      color: $color-white!important;
      font-size: 44px;
      background-color: transparent;
      height: 100%;
      width: $height-navbar;
      transition:  all .2s;
      position: relative;
      padding: $pm-sm;
      &:hover {
        background-color: $color-main;
      }
      &:before, &:after {
        content: "";
        background-color: $color-gray;
        height: 60%;
        margin: 0 auto;
        display: inline-block;
        width: 1px;
        position: absolute;
        top: 50%;
        left: 50%;
      }
      &:before {
        transform: translate(-50%, -50%) rotate(45deg);
      }
      &:after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
    &:hover {
      background-color: rgba(255,255,255,.4);
    }
  }
  img {
    max-height: 80%;
    max-width: 80%;
    z-index: 80;
    @include centerInParent;
    transition:  transform .4s;
    &.movable {
      //cursor: move;
      cursor: grab;
      cursor: -webkit-grab;
    }
  }
  .pad-functions {
    font-size: 25px;
    @include centerHorizontal;
    bottom: 3%;
    z-index: 100;
    width: 350px;
    position: absolute;
    padding: $pm-md;
    display: inline-block;
    background-color: rgba(255,255,255,.4);
    border-radius: $border-radius-bg;
    box-shadow: 0 3px 8px rgba(0,0,0, .3);
    button, a {
      background-color: transparent;
      color: $color-white;
      text-shadow: 0 3px 8px rgba(0,0,0, .3);
      padding: $pm-md;
      display: inline-block;
      border-radius: $border-radius-bg;
      transition:  background-color .4s;
      &:hover {
        background-color: rgba(255,255,255,.2);
      }
    }
  }
  .btn-to-last, .btn-to-next {
    @include centerVertical;
    color: $color-white;
    font-size: 44px;
    height: 140px;
    padding: 0 $pm-md;
    z-index: 100;
    background-color: transparent;
    transition:  all .4s;
    text-shadow: 0 3px 8px rgba(0,0,0, .3);
    &:hover {
      background-color: rgba(255,255,255,.3);
    }
  }
  .btn-to-last {
    left: 0;
    @include borderRadiusRight($border-radius-bg);
  }
  .btn-to-next {
    right: 0;
    @include borderRadiusLeft($border-radius-bg);
  }
}

@media screen and (max-width: 640px){
  .hx-image-modal.hx-modal {
    width: 100%!important;
    .pad-functions {
      bottom: 0;
      width: 100%;
      padding: $pm-sm $pm-md;
      border-radius: 0;
      button, a {
        padding: $pm-sm;
        border-radius: 0;
        font-size: $font-lg;
      }
    }
    .btn-to-last, .btn-to-next {
      height: 100%;
    }
  }
}
</style>
