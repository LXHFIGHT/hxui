<template>
  <span :class="['hx-tag', 
    level, 
    size, 
    blank && 'blank', 
    material && 'material',
    round && 'round']"
    :style="style"
    @click="doClick">
    <slot></slot>
  </span>
</template>

<script>
import { levelKeys } from '../const'
export default {
  name: 'HxTag',
  data () {
    return {}
  },
  props: {
    level: {
      type: String,
      validator (val) {
        return !val || levelKeys.includes(val)
      },
      default: ''
    },
    blank: { // 是否为线框标签
      type: Boolean
    },
    material: { // 是否material风格标签
      type: Boolean
    },
    round: { // 是否为圆角标签
      type: Boolean
    },
    color: {
      type: String
    },
    textColor: {
      type: String
    },
    size: { // 一共包含 sm: 21px  md：27px 和 bg： 34px
      type: String,
      default: 'md'
    }
  },
  computed: {
    style () {
      const backgroundColor = this.color ? `border: 1px solid ${this.color}; background-color: ${this.color};` : ''
      const color = this.textColor ? `color: ${this.textColor};` : ''
      return backgroundColor + color
    }
  },
  methods: {
    doClick () {
      this.$emit('click')
    }
  }
}
</script>
