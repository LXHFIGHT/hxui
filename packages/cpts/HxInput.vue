<template>
  <div class="pad-hx-input" @click="doFocus">
    <input
      v-if="rows === 1"
      :required="required"
      :placeholder="placeholder"
      :type="type"
      :readonly="readonly"
      :disabled="disabled"
      :value="value"
      :data-type="dataType"
      :min-length="minLength"
      @blur="doBlur"
      @focus="doFocus"
      @keyup="doKeyup"
      @keydown="doKeyDown"
      @input="doInput">
    <textarea
      v-if="rows !== 1"
      :required="required"
      :placeholder="placeholder"
      type="text"
      :data-type="dataType"
      :min-length="minLength"
      :value="value"
      :rows="rows"
      :readonly="readonly"
      :disabled="disabled"
      @blur="doBlur"
      @focus="doFocus"
      @keyup="doKeyup"
      @keydown="doKeyDown"
      @input="doInput">
    </textarea>
    <button class="btn-clear" tabindex=-1 v-if="showClearBtn && !readonly" @click="doClear">
      <img class="icon" :src="iconClear" alt="">
    </button>
    <span class="unit">
      <span v-if="unit" v-text="unit"></span>
      <span class="unit" v-if="!unit && showLength && value" v-text="maxLength ? `${value.length}/${maxLength}` : `${value.length}字`"></span>
      <slot name="unit"></slot>
    </span>
  </div>
</template>

<script>
import iconClear from './../img/icon/icon-close.png'
import { MOBILE_DEVICE_MAX_WIDTH, valueTypeArray } from './../const'
/**
 * HxInput组件所接受参数：
 * @prop {String} placeholder 文本框内容
 * @prop {String, Boolean} required 是否非空 可以传”required“、”“，true或false
 * @prop {Boolean} showClearBtn 是否显示清空内容按钮， 默认不显示
 * @prop {String} type 文本框格式，默认为 ”text“
 * @prop {String} unit 是否显示具体单位
 * @prop {String} value 文本框中的值
 */
export default {
  name: 'hx-input',
  data () {
    return {
      iconClear,
      isMobile: false
    }
  },
  props: {
    value: {
      type: [String, Number],
      default: '',
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: [String, Boolean]
    },
    minLength: {
      type: [String, Number]
    },
    showClearBtn: {
      type: [Boolean, String, Number],
      default: false
    },
    unit: String,
    showLength: { // 是否显示内容长度
      type: [Boolean, String, Number],
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    dataType: {
      type: String,
      validator (data) {
        if (!data) {
          return true
        }
        return valueTypeArray.includes(data)
      },
      default: ''
    },
    rows: {
      type: Number,
      default: 1
    },
    readonly: {
      type: [Number, String, Boolean],
      default: false
    },
    disabled: {
      type: [Number, String, Boolean],
      default: false
    },
    maxLength: {
      type: Number
    },
    max: { // 最大数字，仅当内容为数字时有效
      type: Number 
    }
  },
  methods: {
    doKeyup () {
      this.$emit('keyup')
    },
    doKeyDown () {
      if (this.maxLength && this.value.length >= this.maxLength && event.keyCode !== 8) {
        const result = this.value.substring(0, this.maxLength)
        this.$emit('input', result)
        event.preventDefault()
      } else {
        this.$emit('keydown')
      }
    },
    doInput () {
      let value = ''
      let currentValue = event.target.value
      if (this.maxLength && currentValue.length > this.maxLength) {
        value = event.target.value.substring(0, this.maxLength)
      } else if (this.max && !isNaN(currentValue) && currentValue > this.max) {
        value = this.max
      } else {
        value = currentValue
      }
      console.log('Current Length')
      event.target.value = value
      this.$emit('input', value)
    },
    doClear () {
      const view = event.target
      view.value = ''
      view.classList.add('error')
      this.$forceUpdate()
      this.$emit('input', '')
    },
    doBlur () {
      if (this.isMobile) {
        window.scroll(0, 0)
        document.body.scrollTop = 0
      }
      this.$emit('blur')
    },
    doFocus () {
      const view = event.target
      view.classList.remove('error')
      this.$emit('focus')
    }
  },
  created () {
    this.isMobile = document.body.clientWidth <= MOBILE_DEVICE_MAX_WIDTH
  }
}
</script>
