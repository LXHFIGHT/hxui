<template>
  <div class="hx-options" 
    ref="hxOptions"
    :data-value="value" :required="!!required ? 'required' : false">
    <button :class="['item', value === item.value && 'selected']" 
      :key="index"
      :disabled="disabled"
      @click="doSelect(item)"
      v-text="item[key]"
      v-for="(item, index) in options">
    </button>
  </div>
</template>
<script>
export default {
  props: {
    content: {
      type: Array,
      required: true
    },
    keyName: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number]
    },
    onSelect: {
      type: Function,
      default () {
        return () => {}
      }
    },
    disabled: {
      type: [String, Number, Boolean],
      default: false
    },
    required: {
      type: [String, Boolean, Number],
      default: false
    }
  },
  data () {
    return {
      options: [],
      key: ''
    }
  },
  created () {
    this.$_initContent()
    this.$_getKeyName()
  },
  methods: {
    $_getKeyName () { // 智能分析传入数据的key对应的字段
      if (this.keyName) {
        this.key = this.keyName
        return
      }
      if (!this.content.length) {
        return
      }
      if (typeof this.content[0] === 'string') {
        this.key = 'text'
        return 
      }
      if (this.content[0]['text']) {
        this.key = 'text'
        return
      }
      if (this.content[0]['key']) {
        this.key = 'key'
      }
    },
    doSelect (item) {
      this.onSelect(item)
      this.$refs.hxOptions.classList.remove('error')
      if (this.value === item.value) {
        !this.required && this.$emit('input', '')
      } else {
        this.$emit('input', item.value)
        this.$emit('change', item.value)
      }
    },
    $_initContent () {
      if (!this.content) {
        return
      }
      this.options = this.content.map(item => {
        if (typeof item === 'string') {
          let bundle = { value: item }
          bundle.key = item
          bundle.text = item
          bundle[this.keyName] = item
          return bundle
        }
        return item
      })
      this.$forceUpdate()
    }
  },
  watch: {
    content: {
      deep: true,
      handler () {
        this.$_initContent()
      }
    }
  }
}
</script>
