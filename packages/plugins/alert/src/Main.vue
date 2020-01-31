<template>
  <div :class="['hx-modal confirm', show && 'show']">
    <div class="mask" style="opacity: .6"></div>
    <div class="content">
      <div class="alert-content" v-text="content"></div>
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
      content: '',
      show: false,
      fadeInTimer: null,
      fadeOutTimer: null
    }
  },
  methods: {
    $_initContent () {
      const result = []
      for (let param of this.text) {
        if (typeof param === 'object') {
          result.push(JSON.stringify(param))
        } else {
          result.push(param)
        }
      }
      this.content = result.join(' ')
    },
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
    this.$_initContent()
  },
  beforeDestroy () {
    clearTimeout(this.fadeInTimer)
    clearTimeout(this.fadeOutTimer)
  }
}
</script>
