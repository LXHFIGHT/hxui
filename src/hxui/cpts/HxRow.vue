<template>
  <div class="hx-row">
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
