<template>
  <button :class="[
    'hx-button', 
    type, 
    size, 
    (blank && 'blank'),
    (sharp && 'sharp'),
    (round && 'round'),
    (text && 'text')]"
    :style="style"
    @mouseenter="doMouseOver"
    @mouseleave="doMouseLeave"
    ref="hxButton"
    @click="doClick">
    <div v-if="icon" class="pad-icon">
      <img class="hx-button-icon" :src="icon" alt="">
    </div>
    <slot></slot>
  </button>
</template>

<script>
import { getColorStyle } from './../../tools/dom'
export default {
  name: 'hx-button',
  data () {
    return {}
  },
  props: {
    blank: {
      type: Boolean,
      default: false
    },
    round: { // 是否圆角
      type: Boolean,
      default: false
    },
    sharp: { // 是否直角边
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    },
    type: {
      type: String
    },
    size: {
      type: String,
      default: 'md'
    },
    color: { // 按钮颜色
      type: String
    },
    textColor: { // 文字颜色
      type: String
    },
    icon: { // svg图标链接
      type: String
    }
  },
  methods: {
    doClick () {
      this.$emit('click')
    },
    doMouseOver () {
      if (this.color && this.blank) {
        this.$refs['hxButton'].style.color = 'white' 
        this.$refs['hxButton'].style.backgroundColor = this.color 
      }
      this.$emit('mouseover', this.$refs['hxButton'].style.backgroundColor)
    },
    doMouseLeave () {
      if (this.color && this.blank) {
        this.$refs['hxButton'].style.color = this.color
        this.$refs['hxButton'].style.backgroundColor = 'transparent' 
      }
      this.$emit('mouseout')
    }
  },
  computed: {
    style () {
      return getColorStyle({
        color: this.color,
        textColor: this.textColor,
        blank: this.blank,
        text: this.text
      })
    }
  }
}
</script>
