<template>
  <div class="column"
    :data-size="size"
    :data-prop="prop" 
    :data-align="align"
    :data-label="label">
    <slot></slot>
  </div>
</template>

<script>
import { sizeKeys } from './../../const'
export default {
  name: 'hx-table-column',
  props: {
    label: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      validator (val) {
        return [...sizeKeys].includes(val)
      },
      default: 'md'
    },
    prop: {
      type: String
    },
    align: {
      type: String,
      default: 'center',
      validator (val) {
        return ['left', 'right', 'center'].includes(val)
      }
    }
  }
}
</script>

<style lang="scss" scoped> 
</style> 
