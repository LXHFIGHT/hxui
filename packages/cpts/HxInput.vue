<template>
  <div class="pad-hx-input">
    <input
      v-if="rows === 1"
      :required="required"
      :placeholder="placeholder"
      :type="type"
      @blur="doBlur"
      @focus="doFocus"
      :readonly="readonly"
      :disabled="disabled"
      :value="value"
      @keyup="doKeyup"
      @keydown="doKeyDown"
      @input="doInput">
    <textarea
      v-if="rows !== 1"
      :required="required"
      :placeholder="placeholder"
      type="text"
      @blur="doBlur"
      @focus="doFocus"
      :value="value"
      :rows="rows"
      :readonly="readonly"
      :disabled="disabled"
      @keyup="doKeyup"
      @keydown="doKeyDown"
      @input="doInput">
    </textarea>
    <span class="degree" v-if="unit" v-text="unit"></span>
    <span class="degree" v-if="!unit && showLength" v-text="maxLength ? `${value.length}/${maxLength}` : `${value.length}字`"></span>
    <button class="btn-clear" v-if="showClearBtn && !readonly" @click="doClear">
      <img class="icon" :src="iconClear" alt="">
    </button>
  </div>
</template>

<script>
import iconClear from './../img/icon/icon-close.png'
import { MOBILE_DEVICE_MAX_WIDTH } from './../const'
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
    value: String,
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: [String, Boolean]
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
    }
  },
  methods: {
    doKeyup () {
      this.$emit('keydown')
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
    doChange () {
    },
    doInput () {
      let value = ''
      if (this.maxLength && event.target.value.length > this.maxLength) {
        value = event.target.value.substring(0, this.maxLength)
      } else {
        value = event.target.value
      }
      this.$emit('input', value)
      this.$forceUpdate()
    },
    doClear () {
      const view = event.target
      view.value = ''
      view.classList.add('error')
      this.$forceUpdate()
      this.$emit('input', '')
    },
    doBlur () {
      // const view = event.target
      // if (this.required) {
      //   !view.value && view.classList.add('error')
      // }
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
