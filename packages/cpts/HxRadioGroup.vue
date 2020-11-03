<template>
  <div class="hx-checkbox-group">
    <button v-for="(item, idx) in options" 
      :key="idx"
      @click="doSelectItem(item)"
      :class="['item', isShallowEqual(result, item.value) && 'selected']">
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
      result: ''
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
      this.result = Object.assign({}, item.value)
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
        if (newVal && newVal.length) {
          this.result = newVal
        }
      }
    }
  }
}
</script>
