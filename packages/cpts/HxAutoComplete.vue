<template>
  <div class="hx-auto-complete">
    <input type="text"
      ref="inputer"
      class="text-option"
      @click="doAnalysing"
      @keyup="doAnalysing"
      @blur="doBlur"
      v-model="detail"
      :disabled="disabled"
      :placeholder="placeholder" />
    <button class="btn-clear" tabindex=-1 v-if="!hideClearBtn && !disabled" @click="doClear">
      <img class="icon" :src="iconClear" alt="">
    </button>
    <hx-folder :dom="inputer" :onHide="doBlur" :show="showOptions">
      <div :class="['hx-pad-options autocomplete', showOptions && 'show']" 
        ref="padOptions"
        :style="styles">
        <div class="pad-select-zone" v-if="!loading">
          <div v-for="(option, idx) in options" 
            :key="idx"
            @click="doSelect(option)"
            class="option">
            {{ option }}
          </div>
        </div>
        <div class="hx-emptyset light" 
          v-if="options.length === 0 && !loading">
          暂无匹配选项
        </div>
        <hx-loading-icon v-if="loading" height="32px" style="padding: 16px 0;">
        </hx-loading-icon>
      </div>
    </hx-folder>
    <input type="password"
      autocomplete="new-password" 
      style="visiblity: hidden; display: none;" />
  </div>
</template>
<script>
import HxFolder from './HxFolder'
import HxLoadingIcon from './HxLoadingIcon'
import iconClear from './../img/icon/icon-close.png'
export default {
  data () {
    return {
      iconClear,
      showOptions: false,
      detail: '',
      options: [],
      fullOptions: [],
      scroll: 0
    }
  },
  components: {
    HxFolder,
    HxLoadingIcon
  },
  props: {
    upperCase: {
      type: [String, Boolean, Number],
      default: false
    },
    content: { // 纯字符串或整数等基本类型组成的数组
      type: Array,
      required: true,
      validator (val) {
        if (!Array.isArray(val)) {
          return false
        }
        for (let item of val) {
          if (item instanceof Object || item instanceof Function) {
            console.log('提供数据中内容不能包含引用数据类型，请使用字符串、数字等基本数据类型')
            return false
          }
        }
        return true
      }
    },
    value: { // 该选择器关联的数据，可为输入或选中的内容
      type: String,
      required: true,
      default: ''
    },
    isPrefix: { // 匹配规则： false表示全局匹配，true表示前缀匹配
      type: [Number, Boolean, String],
      default: true
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    disabled: {
      type: [Number, Boolean, String],
      default: false
    },
    loading: { // 是否正在加载中
      type: [String, Number, Boolean],
      default: false
    },
    hideClearBtn: { // 是否隐藏清空按钮
      type: [Boolean, String, Number], 
      default: false
    }
  },
  methods: {
    $_init () {
      this.inputer = this.$refs.inputer
      this.screenWidth = document.body.clientWidth
    },
    $_showOption () {
      this.showOptions = true
      const $view = this.$refs.inputer
      this.width = $view.clientWidth + 'px'
    },
    $_initOptions () {
      this.fullOptions = [].concat(this.content)
      this.$_updateOptions()
    },
    $_updateOptions () {
      if (this.detail === '') {
        this.options = this.fullOptions
        return
      }
      this.options = this.fullOptions.filter(v => {
        if (this.isPrefix) {
          return v.indexOf(this.detail) === 0
        } else {
          return v.indexOf(this.detail) !== -1
        }
      })
    },
    doAnalysing () {
      if (event.keyCode === 13) {
        this.showOptions = false
      } else {
        this.$_showOption()
        this.$_updateOptions()
      }
      this.$emit('input', this.detail)
      this.$emit('keyup')
    },
    doBlur () {
      this.showOptions = false
    },
    doClear () {
      this.$emit('input', '')
      this.$emit('change', '')
    },
    doSelect (option) {
      this.$emit('input', option)
      this.$emit('change', option)
      this.$forceUpdate()
    }
  },
  created () {},
  mounted () {
    this.$_init()
    this.$_initOptions()
  },
  watch: {
    value (newVal) {
      if (newVal) {
        this.detail = this.upperCase ? newVal.toLocaleUpperCase() : newVal
      } else {
        this.detail = ''
      }
    },
    content: {
      handler (newVal) {
        this.$_initOptions()
      },
      deep: true
    }
  }
}
</script>
