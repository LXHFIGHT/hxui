<template>
   <div class="hx-tags">
     <span :class="['hx-tag', level, size]"
        :style="`background-color: ${color}; color: ${textColor}; border: ${ color ? 'none' : '' }`"
        v-for="(item, index) in value"
        v-bind:key="index"
        v-text="item">
      </span>
   </div>
</template>

<script>
import { levelKeys } from './../const'
export default {
  name: 'HxTags',
  data () {
    return {}
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    editable: {
      type: Boolean,
      default: false
    },
    level: {
      type: String,
      validator (val) {
        return !val || levelKeys.includes(val)
      },
      default: ''
    },
    color: {
      type: String
    },
    textColor: {
      type: String
    },
    size: { // 一共包含 sm: 20px  md：27px 和 bg： 34px
      type: String,
      default: 'md'
    }
  }
}
</script>
