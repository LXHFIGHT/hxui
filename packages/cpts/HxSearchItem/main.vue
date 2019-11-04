<template>
  <div :class="['item', size]">
    <label v-if="label" v-text="label"></label>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { sizeKeys } from './../../const'
export default {
  name: 'hx-search-item',
  props: {
    label: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      validator (val) {
        return [...sizeKeys, 'auto'].includes(val)
      },
      default: 'auto'
    }
  }
}
</script>

<style lang="scss" scoped> 
</style> 
