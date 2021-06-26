<template>
  <button @click="doSelectItem"
    :class="['hx-radio', 'item', radioType, selected ? 'selected' : '', disabled ? 'disabled' : '']">
    <span :class="['icon-check', !isText && 'no-text' ]"></span>
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
      result: [],
      isText: false,
      radioType: ''
    }
  },
  props: {
    debug: Boolean,
    value: { // 当前值
      type: [Number, String, Boolean]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: { // 父级传入的按钮样式类型
      type: String
    }
  },
  methods: {
    init (isSelected) {
      this.selected = isSelected
      this.isText = !!this.$refs['text'].innerText
    },
    doSelectItem (value) {
      if (this.disabled) {
        return
      }
      const item = { value: this.value, key: this.$refs['text'].innerText }
      if (this.selected) {
        return
      }
      this.$parent.doSelectItem(item)
      this.$emit('select', item)
      this.$emit('change', item)
    },
    isSelected () { // 供父组件调用的获取值的方法
      return this.isSelected ? this.value || this.$refs.text.innerTEXT : null
    }
  },
  mounted () {
    this.radioType = this.type
    this.init()
  },
  watch: {
    type (newVal, oldVal) {
      if (newVal) {
        this.radioType = newVal
      }
    }
  }
}
</script>
