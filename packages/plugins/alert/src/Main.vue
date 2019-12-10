<template>
  <div :class="['hx-modal confirm', show && 'show']">
    <div class="mask" style="opacity: .6"></div>
    <div class="content">
      <div class="alert-content" v-text="text"></div>
      <footer class="footer">
        <button class="hx-button main btn-confirm"
          @click="destroyElement">
          确定
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: '',
      show: false,
      fadeInTimer: null,
      fadeOutTimer: null
    }
  },
  methods: {
    destroyElement () {
      this.show = false
      this.fadeOutTimer = setTimeout(() => {
        this.$destroy(true)
        this.$el.parentNode &&
        this.$el.parentNode.removeChild(this.$el)
      }, 400)
    },
    startTimer () {
      this.fadeInTimer = setTimeout(() => {
        this.show = true
      }, 100)
    },
    doConfirm () {
      this.destroyElement()
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
