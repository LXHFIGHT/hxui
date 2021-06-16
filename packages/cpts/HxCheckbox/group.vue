<template>
  <div class="hx-checkbox-group">
    <div class="hx-content-group" v-if="content && content.length">
      <button v-for="(item, idx) in options" 
        :key="idx"
        @click="doSelectItem(item)"
        :class="['item', result.includes(item.value) && 'selected', disabled ? 'disabled' : '']">
        <span class="icon-check">
          <img class="icon" src="./../../img/icon/icon-check.png" alt="">
        </span>
        {{ item.key }}
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
      type: Array,
      required: true
    },
    disabled: {
      type: [Boolean],
      default: false
    },
    onSelect: { // 当选择选项时
      type: Function
    },
    onCancel: { // 当取消选择选项时
      type: Function
    }
  },
  methods: {
    $_initChildren () {
      this.$children.forEach((v, i) => {
        if (this.disabled) { // 如果数组定义为不可编辑，则设置子组件不可编辑
          v.disabled = true
        }
        if (this.value.includes(v.value)) {
          v.init(true)
        } else {
          v.init(false)
        }
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
      const tempValue = [].concat(this.result)
      if (tempValue.includes(item.value)) {
        for (let i = 0; i < tempValue.length; i++) {
          if (tempValue[i] === item.value) {
            tempValue.splice(i, 1)
            break
          }
        }
        this.onCancel instanceof Function && this.onCancel(item)
        this.$emit('cancel', item) // 可以通过 onCancel 或者 @cancel 做取消勾选事件之后回调
      } else {
        tempValue.push(item.value)
        this.onSelect instanceof Function && this.onSelect(item) 
        this.$emit('select', item)// 可以通过 onSelect 或者 @select 做勾选事件之后回调
      }
      this.result = [].concat(tempValue)
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
