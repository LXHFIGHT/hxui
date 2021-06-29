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
import { getColorStyle } from './../tools/dom'
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
      return getColorStyle({
        color: this.color,
        textColor: this.textColor,
        blank: this.blank
      }) 
    }
  },
  methods: {
    doClick () {
      this.$emit('click')
    }
  }
}
</script>
