<template>
  <div :class="['hx-poptip', level, (isShow ? 'show' : '')]" v-text="title"></div>
</template>

<script>
import config from './../../config'
export default {
  data () {
    return {
      isShow: false,
      fadeOutTimer: {},
      fadeInTimer: {},
      title: '',
      level: config.level.LEVEL_INFO,
      during: 1500
    }
  },
  methods: {
    destroyElement () {
      this.isShow = false
      const destroyTimer = setTimeout(() => {
        this.$destroy(true)
        this.$el.parentNode.removeChild(this.$el)
        clearTimeout(destroyTimer)
      }, 400)
    },
    startTimer () {
      if (this.during > 0) {
        this.fadeInTimer = setTimeout(() => {
          this.isShow = true
          clearTimeout(this.fadeInTimer)
        }, 100)
        this.fadeOutTimer = setTimeout(() => {
          this.destroyElement()
        }, this.during)
      }
    }
  },
  mounted () {
    this.startTimer()
  },
  beforeDestroy () {
    clearTimeout(this.fadeInTimer)
    clearTimeout(this.fadeOutTimer)
  }
}
</script>
