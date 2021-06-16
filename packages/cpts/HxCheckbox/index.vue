<!--
 * @Author       : liuxuhao
 * @LastEditors  : liuxuhao
-->
<template>
  <button @click="doSelectItem"
    :class="['hx-checkbox item', selected ? 'selected' : '', disabled ? 'disabled' : '']">
    <span class="icon-check">
      <img class="icon" src="./../../img/icon/icon-check.png" alt="">
    </span>
    <span class="txt" ref="text">
      <slot></slot>
    </span>
  </button>
</template>
<script>
export default {
  data () {
    return {
      selected: false,
      result: []
    }
  },
  props: {
    value: { // 当前值
      type: [Number, String, Boolean]
    },
    disabled: {
      type: [Number, String, Boolean],
      default: false
    }
  },
  methods: {
    init (isSelected) {
      this.selected = isSelected
    },
    doSelectItem (value) {
      if (this.disabled) {
        return
      }
      const item = { value: this.value, key: this.$refs['text'].innerText }
      this.selected = !this.selected
      this.$parent.doSelectItem(item)
      this.selected ? this.$emit('select', item) : this.$emit('cancel', item)
      this.$emit('change', item)
    },
    isSelected () { // 供父组件调用的获取值的方法
      return this.isSelected ? this.value || this.$refs.text.innerTEXT : null
    }
  },
  mounted () {
    this.init()
  }
}
</script>
