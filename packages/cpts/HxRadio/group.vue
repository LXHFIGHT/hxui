<template>
  <div class="hx-radio-group">
    <div class="hx-content-group" v-if="content && content.length">
      <button v-for="(item, idx) in options" 
        :key="idx"
        @click="doSelectItem(item)"
        :class="['item', type, value === item.value && 'selected', disabled ? 'disabled' : '']">
        <span class="icon-check"></span>
        <span :class="['txt']">{{ item.key }}</span>
      </button>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  data () {
    return {
      options: [],
      result: []
    }
  },
  props: {
    content: {
      type: Array
    },
    value: {
      type: [Number, String, Boolean],
      required: true
    },
    disabled: {
      type: [Boolean],
      default: false
    },
    onSelect: { // 当选择选项时
      type: Function
    },
    type: { // radio按钮组织形式
      type: String,
      default: 'default',
      validator (val) {
        return ['default', 'button', 'round-button'].includes(val)
      } 
    }
  },
  methods: {
    $_initChildren () {
      this.$children.forEach((v, i) => {
        this.disabled && (v.disabled = true) // 如果数组定义为不可编辑，则设置子组件不可编辑
        v.type = this.type
        v.init(this.value === v.value)
      })
    },
    $_initContent () {
      this.options = this.content.map((v, i) => {
        let item = {}
        if (typeof v === 'object') {
          item = v
        } else {
          item.key = v
          item.value = v
        }
        return item
      })
    },
    $_init () {
      if (!this.content) {
        this.$children.length && this.$_initChildren()
      } else {
        this.$_initContent()
      }
    },
    doSelectItem (item) {
      if (this.disabled) {
        return
      }
      if (this.value === item.value) {
        return
      }
      this.result = item.value
      this.$emit('select', item) // 调用 select 方法
      this.onSelect instanceof Function && (this.onSelect(item)) // 不推荐
      this.$emit('input', this.result)
      this.$emit('change', this.result)
    }
  },
  mounted () {
    this.$_init()
  },
  watch: {
    content: {
      deep: true,
      handler () {
        this.$_init()
      }
    },
    value: {
      deep: true,
      immediate: true,
      handler (newVal) {
        if (this.$children && this.$children.length) {
          this.$_initChildren()
          return
        }
        if (newVal && newVal.length) {
          this.result = [].concat(newVal)
        } else {
          this.result = []
        }
      }
    }
  }
}
</script>
