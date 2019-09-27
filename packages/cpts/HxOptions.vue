<template>
  <div class="hx-options">
    <button :class="['item', value === item.value && 'selected']" 
      :key="index"
      :disabled="disabled"
      @click="doSelect(item)"
      v-text="item[keyName]"
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
      default: 'text'
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
    }
  },
  data () {
    return {
      options: []
    }
  },
  created () {
    this.$_initContent()
  },
  methods: {
    doSelect (item) {
      this.onSelect(item)
      if (this.value === item.value) {
        this.$emit('input', '')
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
<style lang="scss" scoped>
@import "./../scss/components/hx-options.scss";
</style>
