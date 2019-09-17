<template>
  <div :class="['hx-row', oneline && 'oneline', !label && 'no-label', labelSize && `${labelSize}-label`]">
    <label v-if="label">
      {{ label }}
      <span v-if="required" class="tip">*</span>
    </label>
    <div class="content">
      <slot ></slot>
      <span class="degree">
        <slot name="degree"></slot> 
      </span>
    </div>
    <span class="text-tips">
      <slot name="tips"></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'hx-row',
  props: {
    label: {
      type: String
    },
    labelSize: { // 行元素标签的宽度， null为不展示标签， 除此之外还有md, bg两种规格
      type: String,
      validator (val) {
        return ['md', 'bg', 'null'].includes(val)
      }
    },
    oneline: {
      type: [String, Boolean, Number],
      default: false
    },
    required: {
      type: [String, Boolean, Number],
      default: false
    }
  },
  data () {
    return {}
  }
}
</script>
