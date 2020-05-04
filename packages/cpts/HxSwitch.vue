<template>
  <div @click="doToggleSwitch()"
    :class="['hx-switch',
      disabled && 'disabled',
      (on ? 'on' : '')]">
  </div>
</template>

<script>
export default {
  name: 'HxSwitch',
  data () {
    return {
      on: false
    }
  },
  props: {
    id: { // 当同一个页面出现多个开关的时候，可以用作区分
      type: [Number, String]
    },
    value: {
      type: [Boolean, String, Number]
    },
    content: {
      type: Array
    },
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
    $_init () {
      if (Array.isArray(this.content)) {
        this.on = this.content[0] === this.value
        return
      }
      if (this.value && this.value !== '0') {
        this.on = true
      } else {
        this.on = false
      }
    },
    doToggleSwitch () {
      if (this.disabled) {
        return
      }
      const { value } = this
      const _handle = (val) => {
        this.$emit('input', val)
        this.$emit('change', { value: val, id: this.id })
        this.$forceUpdate()
        this.doToggle(val, this.id)
        this.$nextTick(this.$_init)
      }
      if (Array.isArray(this.content)) {
        _handle(this.content[1] === this.value ? this.content[0] : this.content[1])
        return
      }  
      let oppositValue = ''
      // 这里对原值进行智能判断，可以判断原值是0或1模式，或者true和false模式 
      if (value === '0' || value === 0) {
        oppositValue = 1
      } else if (value === '1' || value === 1) {
        oppositValue = 0
      } else if (value === true || value === false) {
        oppositValue = !value
      } else if (value == null) {
        oppositValue = 1
      }
      _handle(oppositValue)
    }
  },
  created () {
    this.$_init()
  },
  watch: {
    value: {
      handler (newVal) {
        this.$_init()
      }
    }
  }
}
</script>
