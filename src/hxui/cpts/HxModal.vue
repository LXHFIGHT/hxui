<template>
  <div :class="['hx-modal', show && 'show', size]">
    <div class="mask" @click="onHide"></div>
    <div class="content">
      <header class="header">
        {{ title }}
        <slot name="header"></slot>
      </header>
      <div class="hx-row">
        <slot name="content"></slot>
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
    show: {
      type: Boolean,
      default: false
    },
    size: String,
    title: {
      type: String,
      default: '提示'
    },
    onHide: {
      type: Function,
      required: true
    }
  }
}
</script>
