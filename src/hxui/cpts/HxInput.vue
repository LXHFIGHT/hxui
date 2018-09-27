<template>
  <div class="hx-row">
    <label>
      {{ label }}
      <span v-if="required || typeof required === 'string'"
        class="tip">*</span>
    </label>
    <div class="content">
      <input
        v-if="rows === 1"
        :required="required"
        :placeholder="placeholder"
        :type="type"
        @blur="doBlur"
        @focus="doFocus"
        :value="value"
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
        @input="doInput">
      </textarea>
      <span class="degree" v-if="unit" v-text="unit"></span>
      <span class="degree" v-if="!unit && showLength" v-text="`${value.length}字`"></span>
      <button class="btn-clear" v-if="showClearBtn" @click="doClear">
        <img class="icon" :src="iconClear" alt="">
      </button>
    </div>
  </div>
</template>

<script>
import iconClear from './../img/icon/icon-close.png'
/**
 * HxInput组件所接受参数：
 * @prop {String} label 文本框标签
 * @prop {String} placeholder 文本框内容
 * @prop {String, Boolean} required 是否非空 可以传”required“、”“，true或false
 * @prop {Boolean} showClearBtn 是否显示清空内容按钮， 默认不显示
 * @prop {Boolean} showLength 是否显示内容长度
 * @prop {String} type 文本框格式，默认为 ”text“
 * @prop {String} unit 是否显示具体单位
 * @prop {String} value 文本框中的值
 */
export default {
  name: 'hx-input',
  data () {
    return {
      iconClear
    }
  },
  props: {
    value: String,
    label: {
      type: String,
      default: '标签'
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: [String, Boolean]
    },
    showClearBtn: {
      type: Boolean,
      default: false
    },
    unit: String,
    showLength: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    rows: {
      type: Number,
      default: 1
    }
  },
  methods: {
    doInput () {
      const value = event.target.value
      this.$emit('input', value)
    },
    doClear () {
      const view = event.target
      view.value = ''
      view.classList.add('error')
      this.$emit('input', '')
    },
    doBlur () {
      const view = event.target
      if (this.required) {
        !view.value && view.classList.add('error')
      }
    },
    doFocus () {
      const view = event.target
      view.classList.remove('error')
    }
  }
}
</script>
