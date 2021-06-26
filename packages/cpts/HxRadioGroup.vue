<template>
  <div class="hx-checkbox-group">
    <button v-for="(item, idx) in options" 
      :key="idx"
      @click="doSelectItem(item)"
      :disabled="disabled"
      :class="['item', isShallowEqual(parseInt(check), ~~item.value)  && 'selected']">
      <img class="icon-check" src="./../img/icon/icon-check.png" alt="">
      {{ item.key }}
    </button>
  </div>
</template>
<script>
import { isShallowEqual } from './../tools/object' 
export default {
  data () {
    return {
      options: [],
      isDisable: false,
      check: ''
    }
  },
  props: {
    content: {
      type: Array,
      required: true
    },
    value: {
      type: [Object, String, Number],
      required: true
    },
    onCancel: { // 当取消选择选项时
      type: Function
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    isShallowEqual,
    $_init () {
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
    doSelectItem (item) {
      console.warn('change', item)
      this.$emit('input', item.value)
      this.$emit('change', item.value)
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
      handler (newVal, oldVal) {
        this.check = newVal
      }
    }
  }
}
</script>
