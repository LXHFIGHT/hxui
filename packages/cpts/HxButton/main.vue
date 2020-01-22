<template>
  <button :class="[
    'hx-button', 
    type, 
    size, 
    (blank && 'blank'), 
    (text && 'text')]" 
    @click="doClick">
    <div v-if="dot" class="hx-dot topRight md"></div>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'hx-button',
  data () {
    return {}
  },
  props: {
    blank: {
      type: [Boolean, String],
      default: false
    },
    text: {
      type: [Boolean, String],
      default: false
    },
    type: {
      type: String
    },
    size: {
      type: String,
      default: 'md'
    },
    dot: {
      type: [Boolean, String, Number],
      default: false
    }
  },
  methods: {
    doClick () {
      this.$emit('click')
    }
  }
}
</script>
