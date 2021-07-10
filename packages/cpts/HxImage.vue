<template>
  <div :class="['hx-image', 
      (round && 'round'), 
      position,
      isLoadingImage && 'loading',
      (isBlock && 'block'),
      (height && width) ? 'adjust' : ''
    ]" 
    :style="hxImageStyle" 
    @click="doClick"
    ref="hxImage">
    <img ref="img" class="img" :style="imageStyle" v-if="!isLoadingImage && !isError" :src="imgSrc" alt="">
    <div class="pad-img-error" :style="loadingStyle" v-if="isError" v-html="alt"></div>
    <div class="pad-image-loading" :style="loadingStyle" v-if="isLoadingImage">
      <hx-loading color="#ddd" icon-size="35px"  align="center"></hx-loading>
    </div>
  </div>
</template>

<script>
import HxLoading from './HxLoading'
export default {
  data () {
    return {
      /** 
       * position 表示 图片在hx-image组件的位置, 由组件计算得到:
       * 分为 'center'(正中央)、'centerHorizontal'（水平居中）以及 'centerVertical'(垂直居中)
       */
      position: 'center',
      isLoadingImage: false,
      isNormal: false,
      isBlock: false,
      isError: false,
      imgSrc: '',
      viewHeight: '',
      viewWidth: '',
      imgHeight: '',
      imgWidth: ''
    }
  },
  components: {
    HxLoading
  },
  props: {
    src: {
      type: String,
      required: ''
    },
    round: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: '图片加载不出'
    }
  },
  methods: {
    $_initLayout () {
      const $view = this.$refs.hxImage
      const { height, width } = $view.style
      if (height && width) {
        // 定高定宽
        const { offsetHeight, offsetWidth } = $view
        this.viewHeight = offsetHeight
        this.viewWidth = offsetWidth
      } else if (height && !width) {
        // 定高不定宽
        this.imgHeight = '100%'
        this.imgWidth = 'auto'
      } else {
        // 定宽不定高
        this.imgWidth = '100%'
        this.imgHeight = 'auto'
      }
      this.$_initImage()
    },
    $_initImage () {
      this.isLoadingImage = true
      let img = new Image()
      img.src = this.src
      img.onload = () => {
        this.isLoadingImage = false
        this.imgSrc = this.src
        const { height, width } = this.$refs.hxImage.style
        height && width && this.$_getPositionType(img.height, img.width)
      }
      img.onerror = () => {
        this.isLoadingImage = false
        this.isError = true
        console.log('err')
      }
    },
    $_getPositionType (height, width) { // 计算图片所需展示类型
      const cptRate = this.viewHeight / this.viewWidth // 组件的高宽比
      this.$nextTick(() => {
        const imgRate = height / width // 图片文件高宽比
        if (imgRate > cptRate) {
          this.position = 'centerVertical'
          this.imgWidth = '100%'
          this.imgHeight = 'auto'
        } else {
          this.position = 'centerHorizontal'
          this.imgWidth = 'auto'
          this.imgHeight = '100%'
        }
      })
    },
    doClick () {
      this.$emit('click', this.imgSrc)
    }
  },
  mounted () {
    this.$_initLayout()
  },
  computed: {
    hxImageStyle () {
      const heightStyle = this.height ? `height: ${this.height};` : ''
      const widthStyle = this.width ? `width: ${this.width};` : ''
      return heightStyle + widthStyle
    },
    imageStyle () {
      return `width: ${this.imgWidth}; height: ${this.imgHeight};`
    },
    loadingStyle () {
      const $view = this.$refs.hxImage
      const { height, width } = $view.style
      if (height && width) {
        // 定高定宽
        return 'height: 100%; width: 100%'
      } else if (height && !width) {
        // 定高不定宽
        const { offsetHeight } = $view
        return `width: ${offsetHeight}px; height: 100%`
      } else {
        // 定宽不定高
        const { offsetWidth } = $view
        return `height: ${offsetWidth}px; width: 100%`
      }
    }
  },
  watch: {
    src (newVal, oldVal) {
      if (newVal) {
        this.$_initLayout()
      }
    }
  }
}
</script>
