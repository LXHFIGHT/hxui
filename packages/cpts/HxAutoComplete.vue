<template>
  <div :class="['hx-auto-complete', showOptions && 'show']">
    <input type="text"
      ref="hxAutoComplete"
      class="text-option"
      @click="doAnalysing"
      @keyup="doAnalysing"
      @blur="doBlur"
      v-model="detail"
      :disabled="disabled"
      :placeholder="placeholder"/>
    <div class="pad-options" 
      v-if="options.length" 
      :style="width && `width: ${width};`">
      <div v-for="(option, idx) in options" 
        :key="idx"
        @click="doSelect(option)"
        class="option">
        {{ option.key }}
      </div>
    </div>
  </div>
</template>
<script>
// import { getElementToPageTop, getElementToPageLeft } from './../plugins/tools'
export default {
  data () {
    return {
      showOptions: false,
      detail: '',
      options: [],
      width: 0
    }
  },
  props: {
    upperCase: {
      type: [String, Boolean, Number],
      default: false
    },
    content: { // 纯字符串或整数组成的数组
      type: Array,
      required: true
    },
    value: { // 该选择器关联的数据
      type: String,
      required: true,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    disabled: {
      type: [Number, Boolean, String],
      default: false
    }
  },
  methods: {
    $_showOption () {
      this.showOptions = true
      const $view = this.$refs.hxAutoComplete
      this.width = $view.clientWidth + 'px'
    },
    doAnalysing () {
      this.$_showOption()
      this.$emit('input', this.detail)
      const _getOptions = () => {
        return this.content.map(v => {
          if (typeof v !== 'object') {
            return { key: v, value: v }
          }
          return v
        })
      }
      if (this.detail === '') {
        this.options = _getOptions()
        return
      }
      this.options = _getOptions().filter(v => {
        return v.key.indexOf(this.detail) !== -1
      })
    },
    doBlur () {
      this.showOptions = false
    },
    doSelect (option) {
      this.$emit('input', option.key)
      this.$emit('change', option)
      this.$forceUpdate()
    } 
  },
  created () {},
  mounted () {},
  watch: {
    value (newVal) {
      if (newVal) {
        this.detail = this.upperCase ? newVal.toLocaleUpperCase() : newVal
      } else {
        this.detail = ''
      }
    }
  }
}
</script>
<style lang="scss">
@import "./../scss/variable.scss";
.hx-auto-complete {
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
    position: fixed;
    background-color: white;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: $shadow-bg;
    border-radius: $pm-sm/2;
    visibility: hidden;
    border: 1px solid $color-gray;
    opacity: .0;
    transition: all .4s;
    transform: translateY(-$pm-md);
    .option {
      width: 100%;
      display: block;
      padding: $pm-sm;
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
      transform: translateY(0);
    }
  }
}
</style>
