<template>
  <button :class="['hx-button', type]" @click="doClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    type: {
      type: String
    }
  },
  methods: {
    doClick () {
      this.$emit('click')
    }
  }
}
</script>
