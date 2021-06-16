<template>
  <div :class="['hx-dot', 
    isText && 'text',
    size, 
    position, 
    blank && 'blank', 
    (level || color)]"
    ref="hxDot">
    {{ text }}
    <slot></slot>
  </div>
</template>

<script>
import { Positions, levelKeys, sizeKeysLess } from './../const' 
export default {
  props: {
    blank: { 
      type: [String, Boolean, Number],
      default: ''
    },
    text: {
      type: String
    },
    size: {
      type: String,
      default: 'md',
      validator (val) {
        return sizeKeysLess.includes(val)
      }
    },
    position: { // 点组件所在位置
      type: String,
      default: Positions.TOP_RIGHT,
      validator (val) {
        return [Positions.TOP_RIGHT, Positions.TOP_RIGHT, Positions.BOTTOM_LEFT, Positions.BOTTOM_RIGHT].includes(val)
      }
    },
    level: {
      type: String,
      validator (val) {
        return levelKeys.includes(val)
      } 
    },
    color: {
      type: String
    }
  },
  data () {
    return {
      isText: false
    }
  },
  mounted () {
    this.$refs['hxDot'].innerText && (this.isText = true)
  }
}
</script>
