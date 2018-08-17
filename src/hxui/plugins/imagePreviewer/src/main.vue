<template>
  <div :class="['hx-image-modal hx-modal ', (show ? 'show' : ''), screen]">
    <header class="navbar">
      <span class="title" v-text="`${index + 1} / ${urls.length}`"></span>
      <button class="btn-quit-preview" @click="doQuitPreview"></button>
    </header>
    <img class="modal-image-preview"
         ref="imageElem"
         ondragstart="return false;"
         :src="current"
         alt="image" />
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
import popTip from './../../popTip'
import config from './../../config'
export default {
  data () {
    return {
      current: '',
      urls: [],
      show: false,
      screen: '',
      index: 0,
      scale: 1.0,
      maxScale: 2.5,
      degree: 0,
      closeTimer: null
    }
  },
  methods: {
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
      this.scale = 1.0
      this.degree = 0
      imageElem.style.top = '50%'
      imageElem.style.left = '50%'
      imageElem.style.transform = 'translate(-50%, -50%)'
    },
    $_transform () {
      const { degree, scale } = this
      console.log('The elem is ', this.$refs.imageElem)
      console.log(`translate(-50%, -50%) rotate(${degree}deg) scale(${scale}, ${scale})`)
      this.$refs.imageElem.style.transform = `translate(-50%, -50%) rotate(${degree}deg) scale(${scale}, ${scale})`
    },
    $_adjustScale (isZoomIn) {
      let { scale, maxScale } = this
      if (isZoomIn) {
        if (this.scale < maxScale) {
          scale += 0.5
        } else {
          popTip({title: '不能再放大了', level: config.level.LEVEL_WARNING})
        }
      } else {
        if (scale > 1.0) {
          scale -= 0.5
        } else {
          popTip({title: '不能再缩小了', level: config.level.LEVEL_WARNING})
        }
      }
      this.scale = scale
      this.$_transform()
    },
    $_rotate (isRotateRight) {
      console.log('LINX', popTip.LEVEL_WARNING)
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
    }
  },
  mounted () {
    this.show = true
    this.$_getCurrentImageIndex()
  },
  beforeDestroy () {
    clearTimeout(this.closeTimer)
  }
}
</script>
