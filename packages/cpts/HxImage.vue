<template>
  <div :class="['hx-image', (round && 'round'), position, (isBlock && 'block')]" 
    :style="`height: ${height || ''}; width: ${width || ''}`" 
    ref="hxImage">
    <img class="img" ref="img" v-if="!isLoadingImage" :src="src" alt="">
  </div>
</template>

<script>
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
      isBlock: false
    }
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
    }
  },
  methods: {
    $_initLayout () {
      const $view = this.$refs.hxImage
      if (!$view.style.height && !$view.style.width) {
        this.isBlock = true
      }
      
      this.clientWidth = $view.clientWidth
      this.$_initImage()
    },
    $_getPositionType (height, width) { // 计算图片所需展示类型
      const $view = this.$refs.hxImage
      const cptRate = $view.clientHeight / $view.clientWidth // 组件的高宽比
      const imgRate = height / width // 图片文件高宽比
      if (imgRate > cptRate) {
        this.position = 'centerVertical'
      } else {
        this.position = 'centerHorizontal'
      }
    },
    $_initImage () {
      this.isLoadingImage = true
      let img = new Image()
      img.src = this.src
      img.onload = () => {
        this.isLoadingImage = false
        this.$_getPositionType(img.height, img.width)
      }
    }
  },
  mounted () {
    this.$_initLayout()
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
