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
import { levelKeys, Levels } from './../const'
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
        return levelKeys.includes(data)
      },
      default: Levels.INFO
    }
  },
  methods: {
    doClose () {
      this.isClose = true
    }
  }
}
</script>
