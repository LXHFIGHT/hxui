<template>
  <div :class="['hx-selector']"
    :data-value="value"
    :required="!!required ? 'required' : false">
    <input type="text" readonly
      :class="['text-option', (_optionFilter(value) === placeholder) && 'color-gray']" 
      @focus="doFocus"
      @blur="doBlur"
      ref="inputer"
      :disabled="disabled"
      :value="_optionFilter(value)"/>
    <button v-if="value" class="btn-clear" @click="doClear">×</button>
    <div :class="['hx-pad-options', showOptions && 'show']" ref="padOptions" 
      :style="`left: ${left}px; top: ${top}px; width: ${inputerWidth}px; transform: translateY(${startScrollTop - scroll}px)`">
      <div class="pad-select-zone">
        <div v-for="(option, idx) in options" :key="idx">
          <div @click="doSelect(option)"
            v-if="option.value !== '|' || option[keyName] !== '|'"
            :value="option.value"
            :class="['option', 
              option.disabled ? 'disabled' : '', 
              option.value === value && 'selected']">
            {{ option[keyName] }}
          </div>
          <div class="line-divider" v-if="option.value === '|' && option[keyName] === '|'"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { 
  getElementToPageTop, 
  getElementToPageLeft, 
  getElementScrollTop 
} from './../tools/dom'
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
      padOptionsWidth: 0,
      startScrollTop: 0,
      scroll: 0,
      timer: null
    }
  },
  props: {
    content: { // 纯字符串或整数组成的数组，或者 {text: '', value: ''} 规格对象组成的数组
      type: Array,
      required: true
    },
    value: { // 该选择器关联的数据
      type: [Number, String],
      required: true,
      default: ''
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
    $_initPosition () {
      this.$nextTick(() => {
        const $padOptions = this.$refs.padOptions
        const body = document.querySelector('body')
        if (body.append) {
          body.append($padOptions)
        } else {
          body.appendChild($padOptions)
        }
      })
    },
    $_renderLayout () {
      const $view = this.$refs.inputer
      const inputerHeight = $view.clientHeight
      const $padOptions = this.$refs.padOptions
      this.padOptionsWidth = $padOptions.clientWidth
      this.inputerWidth = $view.clientWidth
      this.left = getElementToPageLeft($view) - (this.padOptionsWidth - this.inputerWidth) / 2
      this.top = getElementToPageTop($view) + inputerHeight + 16
      this.scroll = getElementScrollTop($view)
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
      if (option.disabled) {
        return
      }
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
    this.startScrollTop = getElementScrollTop(this.$refs.inputer)
    this.scroll = this.startScrollTop
    this.$_initPosition()
    this.$_renderLayout()
    this.timer = window.setInterval(() => {
      this.$_renderLayout()
    }, 1000 / 60)
  },
  beforeDestroy () {
    window.clearInterval(this.timer)
    const body = document.querySelector('body')
    body.removeChild(this.$refs.padOptions)
  },
  destroyed () {
    this.$destroy(true)
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
