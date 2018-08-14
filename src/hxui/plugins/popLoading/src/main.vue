<template>
  <div :class="['hx-small-modal loading', (isShow ? 'show' : '')]">
    <section class='hx-loading'></section>
    <span class='text-small-modal' v-text="title"></span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '加载中',
      isShow: false,
      timeout: 30000,
      fadeInTimer: {},
      fadeOutTimer: {}
    }
  },
  methods: {
    destroyElement () {
      this.isShow = false
      const destroyTimer = setTimeout(() => {
        this.$destroy(true)
        this.$el.parentNode &&
        this.$el.parentNode.removeChild(this.$el)
        clearTimeout(destroyTimer)
        clearTimeout(this.fadeInTimer)
        clearTimeout(this.fadeOutTimer)
      }, 400)
    },
    startTimer () {
      this.fadeInTimer = setTimeout(() => {
        this.isShow = true
      }, 100)
      this.fadeOutTimer = setTimeout(() => {
        this.destroyElement()
      }, this.timeout)
    }
  },
  mounted () {
    this.startTimer()
  }
}
</script>
