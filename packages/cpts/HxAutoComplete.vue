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
      :placeholder="placeholder"/>
    <div :class="['hx-pad-options autocomplete', showOptions && 'show']" 
      ref="padOptions"
      :style="styles">
      <div v-for="(option, idx) in options" 
        :key="idx"
        @click="doSelect(option)"
        class="option">
        {{ option.key }}
      </div>
      <div class="hx-emptyset light" 
        v-if="options.length === 0">
        暂无匹配选项
      </div>
    </div>
  </div>
</template>
<script>
import HxLoadingIcon from './HxLoadingIcon'
import { 
  getElementToPageTop, 
  getElementToPageLeft, 
  getElementScrollTop 
} from './../tools/dom'
export default {
  components: {
    HxLoadingIcon
  },
  data () {
    return {
      showOptions: false,
      detail: '',
      options: [],
      width: 0,
      left: 0,
      top: 0,
      inputerHeight: 0,
      inputerWidth: 0,
      padOptionsWidth: 0,
      scroll: 0,
      startScrollTop: 0
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
    },
    loading: { // 是否正在加载中
      type: [String, Number, Boolean],
      default: false
    }
  },
  methods: {
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
    $_showOption () {
      this.showOptions = true
      const $view = this.$refs.inputer
      this.width = $view.clientWidth + 'px'
    },
    $_initOptions () {
      this.options = this.content.map(v => {
        if (typeof v !== 'object') {
          return { key: v, value: v }
        }
        return v
      })
    },
    doAnalysing () {
      this.$_showOption()
      this.$emit('input', this.detail)
      this.$_initOptions()
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
  mounted () {
    this.screenWidth = document.body.clientWidth
    this.$_initPosition()
    this.startScrollTop = getElementScrollTop(this.$refs.inputer)
    this.scroll = this.startScrollTop
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
  computed: {
    styles () {
      const left = this.left ? `left: ${this.left}px;` : ''
      const top = this.top ? `top: ${this.top}px;` : ''
      const width = this.inputerWidth ? `width: ${this.inputerWidth}px;` : ''
      const transform = this.left ? `transform: translateY(${this.startScrollTop - this.scroll}px);` : ''
      return (left + top + width + transform)
    }
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
