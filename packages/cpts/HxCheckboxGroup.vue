<template>
  <div class="hx-checkbox-group">
    <button v-for="(item, idx) in options" 
      :key="idx"
      @click="doSelectItem(item)"
      :class="['item', result.includes(item.value) && 'selected']">
      <img class="icon-check" src="./../img/icon/icon-check.png" alt="">
      {{ item.key }}
    </button>
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
      type: Array,
      required: true
    },
    value: {
      type: Array,
      required: true
    },
    onSelect: { // 当选择选项时
      type: Function
    },
    onCancel: { // 当取消选择选项时
      type: Function
    }
  },
  methods: {
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
      console.warn(this.options)
    },
    doSelectItem (item) {
      const tempValue = [].concat(this.result)
      console.log('Data', tempValue, item, this.value)
      if (tempValue.includes(item.value)) {
        for (let i = 0; i < tempValue.length; i++) {
          if (tempValue[i] === item.value) {
            tempValue.splice(i, 1)
            break
          }
        }
        this.onCancel instanceof Function && this.onCancel(item.value)
      } else {
        tempValue.push(item.value)
        this.onSelect instanceof Function && this.onSelect(item.value)
      }
      console.log('Temp Data', tempValue)
      this.result = [].concat(tempValue)
      console.log('The Result', this.result)
      this.$emit('input', this.result)
      this.$emit('change', this.result)
    }
  },
  created () {
    this.$_init()
  },
  watch: {
    content: {
      deep: true,
      handler () {
        this.$_init()
      }
    }
  }
}
</script>
