<template>
  <div class="hx-datetime-picker" ref="main">
    <div class="pad-input" ref="padInputer">
      <input type="text" 
        :class="['hx-input', !value && 'empty']"
        :placeholder="placeholder"
        readonly
        @click="doShowPicker"
        v-text="value">
    </div>
    <div :class="['pad-picker', showPicker && 'show']" ref="padPicker">
    </div>
  </div>
</template>
<script>
// HXUI日历选择空间
import { getElementToPageTop, getElementToPageLeft } from './../plugins/tools'
export default {
  data () {
    return {
      showPicker: false
    }
  },
  props: {
    placeholder: {
      type: String,
      default: '请选择日期时间'
    },
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    $_init () {
      this.$nextTick(() => {
        const body = document.querySelector('body')
        if (body.append) {
          body.append(this.$refs.padPicker)
        } else {
          body.appendChild(this.$refs.padPicker)
        }
      })
    },
    $_initPosition () {
      const $view = this.$refs.main
      const $picker = this.$refs.padPicker
      const pageX = getElementToPageLeft($view)
      const pageY = getElementToPageTop($view)
      // const windowWidth = document.body.clientWidth
      // const windowHeight = document.body.clientHeight
      $picker.style.top = `${pageY}px`
      $picker.style.left = `${pageX}px`
    },
    doShowPicker () {
      this.showPicker = true
    }
  },
  mounted () {
    this.$_init()
    this.$_initPosition()
  },
  destroyed () {
    this.$destroy(true)
    this.$refs.padPicker &&
    this.$refs.padPicker.parentNode &&
    this.$refs.padPicker.parentNode.removeChild(this.$refs.padPicker)
  }
}
</script>
<style lang="scss" scoped>
@import "./../scss/variable.scss";
.hx-datetime-picker {
  height: 100%;
  width: 100%;
  .pad-input {
    width: 100%;
    .hx-input {
      height: $height-regular;
      width: 100%;
      padding: 0 $pm-sm;
      border: 1px solid $color-gray;
    }
  }
}
.pad-picker {
  height: 300px;
  width: 300px;
  display: block;
  position: fixed;
  z-index: 2000;
  background-color: white;
  box-shadow: $shadow-bg;
}
</style>
