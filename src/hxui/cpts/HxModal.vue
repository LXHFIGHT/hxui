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
    }
  },
  methods: {
    onHide () {
      this.$emit('input', false)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "./../../hxui/scss/plugins/hx-modal.scss";
</style>
