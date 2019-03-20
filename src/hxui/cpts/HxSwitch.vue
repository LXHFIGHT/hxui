<template>
  <div @click="doToggleSwitch()"
    :class="['hx-switch',
      disabled && 'disabled',
      (value ? 'on' : '')]">
  </div>
</template>

<script>
export default {
  name: 'HxSwitch',
  data () {
    return {}
  },
  props: {
    value: '',
    doToggle: {
      type: Function,
      default: function () {
        return () => {}
      }
    },
    disabled: {
      type: [String, Number, Boolean],
      default: ''
    }
  },
  methods: {
    doToggleSwitch () {
      console.log('Switch')
      if (this.disabled) {
        return
      }
      console.log('Switch II')
      const { value } = this
      let oppositValue = !value
      // 这里对原值进行智能判断，可以判断原值是0或1模式，或者true和false模式 
      if (value === 0 || value === '0' || value === 1 || value === '1') {
        oppositValue += 0
      }
      this.$emit('input', oppositValue)
      this.doToggle(oppositValue)
    }
  }
}
</script>
