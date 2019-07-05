<template>
  <div :class="['hx-modal', value && 'show', size]">
    <div class="mask" @click="onHide"></div>
    <div class="content">
      <header class="header">
        {{ title }}
        <slot name="header"></slot>
      </header>
      <div >
        <slot name="content"></slot>
        <slot></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hx-modal',
  data () {
    return {}
  },
  props: {
    value: {
      type: [Number, String, Boolean]
    },
    size: String,
    title: {
      type: String,
      default: '提示'
    },
    disabledMask: { // 点击蒙层区域是否关闭模态框
      type: [String, Number, Boolean],
      default: false
    }
  },
  methods: {
    $_init () {
      this.$nextTick(() => {
        const body = document.querySelector('body')
        if (body.append) {
          body.append(this.$el)
        } else {
          body.appendChild(this.$el)
        }
      })
    },
    onHide () {
      !this.disableMask && this.$emit('input', false)
    }
  },
  mounted () {
    this.$_init()
  },
  destroyed() {
    this.$destroy(true)
    this.$el.parentNode &&
    this.$el.parentNode.removeChild(this.$el)
  }
}
</script>
<style lang="scss" scoped>
  @import "./../../hxui/scss/plugins/hx-modal.scss";
</style>
