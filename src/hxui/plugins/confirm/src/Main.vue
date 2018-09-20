<template>
  <div :class="['hx-modal confirm', show && 'show']">
    <div class="mask" @click="destroyElement"></div>
    <div class="content">
      <header v-text="title">
      </header>
      <div class="confirm-content" v-text="content"></div>
      <footer>
        <button class="hx-button"
          v-text="cancelText"
          v-if="showCancel"
          @click="destroyElement"></button>
        <button :class="['hx-button main', !showCancel && 'full']"
          v-text="confirmText"
          @click="doConfirm"></button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '提示',
      content: '',
      onConfirm: () => {},
      onCancel: () => {},
      confirmText: '确定',
      cancelText: '取消',
      showCancel: true,
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
      this.onConfirm()
      this.destroyElement()
    },
    doCancel () {
      this.onCancel()
      this.destroyElement()
    }
  },
  mounted () {
    console.log(this.content)
    this.startTimer()
  },
  beforeDestroy () {
    clearTimeout(this.fadeInTimer)
    clearTimeout(this.fadeOutTimer)
  }
}
</script>
