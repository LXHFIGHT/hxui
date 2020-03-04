<template>
  <div class="pad-hx-message" v-if="!isClose">
    <div :class="['hx-message', level, size]">
      <span class="text">
        {{ text }}
        <slot></slot>
      </span>
      <span v-if="closable" 
        class="btn-close" 
        @click="doClose">
        ×
      </span>
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
    },
    size: { // 消息框的尺寸
      type: String,
      validator (data) {
        return ['sm', 'md', 'bg'].includes(data)
      },
      default: 'md'
    },
    closable: { // 是否可以临时关闭
      type: [Boolean, Number, String],
      default: false
    },
    onClose: { // 点击关闭按钮之后触发的回调
      type: Function,
      default () {
        return () => {}
      }
    }
  },
  methods: {
    doClose () {
      this.isClose = true
      this.onClose instanceof Function && this.onClose()
    }
  }
}
</script>
