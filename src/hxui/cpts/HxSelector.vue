<template>
  <div :class="['hx-selector', showOptions && 'show']">
    <input type="text" readonly
      :class="['text-option', (_optionFilter(value) === placeholder) && 'color-gray']" 
      @focus="doFocus"
      @blur="doBlur"
      :disabled="disabled"
      :value="_optionFilter(value)" />
    <div class="pad-options">
      <div v-for="(option, idx) in options" 
        :key="idx"
        @click="doSelect(option)"
        :value="option.value"
        :class="['option', option.value === value && 'selected']">
        {{ option[keyName] }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showOptions: false,
      options: []
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
    doFocus () {
      this.showOptions = true
    },
    doBlur () {
      this.showOptions = false
    },
    doSelect (option) {
      console.log('Data: ', option)
      this.$emit('input', option.value)
      this.$emit('change')
      this.$forceUpdate()
    } 
  },
  created () {
    this.$_init()
  }
}
</script>
<style lang="scss">
@import "./../scss/variable.scss";
.hx-selector {
  height: $height-regular;
  width: 100%;
  display: block;
  position: relative;
  z-index: 100;
  .text-option {
    font-size: $font-md;
  }
  .pad-options {
    font-size: $font-md;
    top: 100%;
    background-color: white;
    width: 100%;
    @include centerHorizontal;
    max-width: 200px;
    padding: 0;
    box-shadow: 0 0px 20px rgba(0,0,0,.2);
    border-radius: $pm-sm;
    visibility: hidden;
    border: 1px solid $color-gray;
    opacity: .0;
    top: 100%;
    transition: all .4s;
    &::before {
      content: "";
      height: 0;
      width: 0;
      top: -7px;
      border-bottom: 7px solid white;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-top: 0 solid transparent;
      position: absolute;
      @include centerHorizontal;
    }
    .option {
      width: 100%;
      display: block;
      padding: $pm-sm $pm-md;
      @include nowrap;
      cursor: default;
      font-size: $font-md;
      color: $color-dark;
      &.selected { 
        background-color: rgba($color-main, .1);
      }
      &:hover {
        background-color: rgba($color-main, .05);
      }
    }
  }
  &.show {
    .pad-options {
      visibility: visible;
      opacity: 1.0;
      top: calc(100% + #{$pm-md});
    }
  }
}
</style>
