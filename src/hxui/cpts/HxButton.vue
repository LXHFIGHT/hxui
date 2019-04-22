<template>
  <button :class="[
    'hx-button', 
    type, 
    size, 
    (blank && 'blank'), 
    (text && 'text')]" 
    @click="doClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
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
    }
  },
  methods: {
    doClick () {
      this.$emit('click')
    }
  }
}
</script>
