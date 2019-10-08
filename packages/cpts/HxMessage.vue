<template>
  <div class="pad-hx-message" v-if="!isClose">
    <div :class="['hx-message', level]">
      <span class="text">
        {{ text }}
        <slot></slot>
      </span>
      <span class="btn-close" @click="doClose">×</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isClose: false
    }
  },
  props: {
    text: {
      type: String
    },
    level: {
      type: String,
      validator (data) {
        return ['info', 'success', 'error', 'warn', 'fatal'].includes(data)
      },
      default: 'info'
    }
  },
  methods: {
    doClose () {
      this.isClose = true
    }
  }
}
</script>
