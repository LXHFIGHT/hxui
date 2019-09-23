<template>
  <div :class="['hx-image', (round && 'round'), type]">
    <img :src="image" alt="">
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: ''
    }
  },
  props: {
    image: {
      type: String,
      required: true
    },
    round: {
      type: Boolean,
      default: false
    }
  },
  created () {
      
  }
}
</script>
