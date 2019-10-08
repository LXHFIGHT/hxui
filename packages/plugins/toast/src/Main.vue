<template>
  <div :class="['hx-toast',
    position,
    level,
    (isShow ? 'show' : '')]" v-text="text"></div>
</template>

<script>
import { Levels, Positions } from './../../../const'
export default {
  data () {
    return {
      isShow: false,
      fadeOutTimer: {},
      fadeInTimer: {},
      text: '',
      position: '',
      level: Levels.DEFAULT,
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
  created () {
    this.position || (this.position = Positions.TOP)
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
