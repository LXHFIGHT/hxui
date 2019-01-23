<template>
  <button :class="['hx-button', type]">
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
  }
}
</script>
