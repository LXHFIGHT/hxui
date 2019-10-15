<template>
  <div :class="['hx-selector', showOptions && 'show']">
    <input type="text" readonly
      :class="['text-option', (_optionFilter(value) === placeholder) && 'color-gray']" 
      @focus="doFocus"
      @blur="doBlur"
      ref="inputer"
      :disabled="disabled"
      :value="_optionFilter(value)" />
    <button class="btn-clear" @click="doClear">
      ×
    </button>
    <div class="pad-options" ref="padOptions" 
      :style="`left: ${left}px; top: ${top}px; width: ${inputerWidth}px;`">
      <div class="pad-select-zone">
        <div v-for="(option, idx) in options" 
          :key="idx"
          @click="doSelect(option)"
          :value="option.value"
          :class="['option', option.value === value && 'selected']">
          {{ option[keyName] }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getElementToPageTop, getElementToPageLeft } from './../tools/dom'
export default {
  data () {
    return {
      screenWidth: 0,
      showOptions: false,
      options: [],
      left: 0,
      top: 0,
      inputerHeight: 0,
      inputerWidth: 0,
      timer: null
    }
  },
  props: {
    content: { // 纯字符串或整数组成的数组，或者 {text: '', value: ''} 规格对象组成的数组
      type: Array,
      required: true
    },
    value: { // 该选择器关联的数据
      type: [Number, Boolean, String],
      required: true
    },
    keyName: { // 选项和value对应的键名
      type: String,
      default: 'text'
    },
    disabled: {
      type: [String, Boolean, Number],
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  methods: {
    _optionFilter (data) {
      if (!this.options) {
        return this.placeholder
      }
      const result = this.options.filter(v => v.value === data)
      if (result.length) {
        return result[0][this.keyName]
      }
      return this.placeholder
    },
    $_init () {
      this.options = []
      for (let option of this.content) {
        if (typeof option !== 'object') {
          let obj = { value: option }
          obj[this.keyName] = option
          this.options.push(obj)
          continue
        }
        this.options.push(option)
      }
    },
    $_initLayout () {
      const $view = this.$refs.inputer
      const inputerHeight = $view.clientHeight
      this.inputerWidth = $view.clientWidth
      this.left = getElementToPageLeft($view)
      this.top = getElementToPageTop($view) + inputerHeight + 16
    },
    doClear () {
      this.$emit('input', '')
      this.$emit('change')
      this.$forceUpdate()
    },
    doFocus () {
      this.showOptions = true
    },
    doBlur () {
      this.showOptions = false
    },
    doSelect (option) {
      this.$emit('input', option.value)
      this.$emit('change')
      this.$forceUpdate()
    }
  },
  created () {
    this.$_init()
  },
  mounted () {
    this.screenWidth = document.body.clientWidth
    this.$_initLayout()
    this.timer = window.setInterval(() => {
      if (document.body.clientWidth !== this.screenWidth) {
        this.screenWidth = document.body.clientWidth
        this.$_initLayout()
      }
    }, 1000)
  },
  beforeDestroy () {
    window.clearInterval(this.timer)
  },
  watch: {
    content: {
      handler (newVal) {
        this.$_init()
      },
      deep: true
    }
  }
}
</script>
