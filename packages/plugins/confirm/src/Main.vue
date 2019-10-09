<template>
  <div :class="['hx-modal confirm', show && 'show', level]">
    <div class="mask" @click="destroyElement"></div>
    <div class="content">
      <header class="header" v-text="title"></header>
      <div class="confirm-content" v-if="text" v-text="text"></div>
      <div class="confirm-content" v-if="html" v-html="html"></div>
      <footer class="footer">
        <button class="hx-button btn-cancel"
          v-text="cancelText"
          @click="destroyElement"></button>
        <button class="hx-button main btn-confirm"
          v-text="confirmText"
          @click="doConfirm"></button>
      </footer>
    </div>
  </div>
</template>

<script>
import { levelFilter } from './../../../const'
export default {
  data () {
    return {
      title: '',
      text: '',
      html: '',
      onConfirm: () => {},
      onCancel: () => {},
      confirmText: '确定',
      cancelText: '取消',
      level: '',
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
  created () {
    this.title || (this.title = levelFilter(this.title))
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

<style lang="scss" scoped>
@import './../../../scss/variable.scss';
@import './../../../scss/plugins/hx-modal.scss';
@import './../../../scss/plugins/hx-confirm.scss';
</style>
