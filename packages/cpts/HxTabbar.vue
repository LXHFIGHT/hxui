<template>
  <div :class="['hx-tabbar', disabled ? 'disabled' : '']" ref="main">
    <div :style="`width: ${width}px; left: ${left}px`" 
      class="move-item"></div>
    <div :class="['item', (value === item.value) && 'selected']"
      :key="index"
      v-for="(item, index) in tabbarOptions"
      v-text="item.key"
      @click="doSelectItem(item, index)">
    </div>
  </div>
</template>
<script>
/**
 * tabbar组件, 支持v-model， 以下是参数详解：
 * color: {string} 颜色主题，主要包含 main(default), orange(warn), green(success), error(error)
 * onSelect: 选中选项触发事件，接收整个数组单项作为唯一一个参数
 * content: {Array} 必填项，表示各种选项的数据
 *  如果数组单项是对象:
 *   optionItem.value: 选项对应的值
 *   optionItem.key: 选中选项
 *  如果数组单项是字符串或者数值等基本类型，那么key和value都一样是这个值
 */
export default {
  data () {
    return {
      tabbarOptions: [],
      width: 0,
      left: 0,
      index: 0
    }
  },
  props: {
    value: {},
    color: {
      type: String,
      default: 'main'
    },
    disabled: {
      type: [Number, String, Boolean],
      default: false
    },
    level: {
      type: String,
      default: 'main'
    },
    content: {
      type: Array,
      required: true
    },
    onSelect: {
      type: Function
    }
  },
  created () {
    this.tabbarOptions = this.content.map((v, i) => {
      let item = {}
      if (typeof v === 'object') {
        item = v
      } else {
        item.key = v
        item.value = v
      }
      if (this.value === item.value) {
        this.index = i
      }
      return item
    })
  },
  mounted () {
    this.$_init()
  },
  methods: {
    $_init () {
      const $items = document.querySelectorAll('.hx-tabbar>.item')
      for (let i = 0; i < $items.length; i++) {
        this.tabbarOptions[i].width = $items[i].offsetWidth
      }
      this.width = this.tabbarOptions[0].width
      this.$_locateMagicBar(this.value)
    },
    $_getIndex () {
      for (let i = 0; i < this.tabbarOptions.length; i++) {
        if (this.tabbarOptions[i].value === this.value) {
          this.index = i
          this.width = this.tabbarOptions[i].width
          return
        }
      }      
    },
    $_locateMagicBar () {
      let left = 0
      for (let i = 0; i < this.index; i++) {
        left += this.tabbarOptions[i].width
      }
      this.left = left
    },
    doSelectItem (item, index) {
      if (this.disabled) {
        return
      }
      this.index = index
      this.$emit('input', item.value)
      this.$emit('change', item)
      this.$_locateMagicBar()
      this.onSelect instanceof Function && this.onSelect(item)
    }
  },
  watch: {
    value (newVal) {
      this.$_getIndex()
      this.$_locateMagicBar()
      this.$forceUpdate()
    }
  } 
}
</script>
