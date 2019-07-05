<template>
  <div :class="['hx-row', oneline && 'oneline']">
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
      type: String,
      required: true
    },
    oneline: {
      type: [String, Boolean, Number],
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  }
}
</script>
