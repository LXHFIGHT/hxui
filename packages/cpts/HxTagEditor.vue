<template>
  <div class="hx-tag-editor">
    <div class="zone-tags">
      <div v-for="(item, idx) in target" :class="['tag', disabled && 'disabled']" :key="idx">
        {{ item }}
        <button class="btn-remove" v-if="!disabled && !readonly" @click="doRemoveTag(idx)">×</button>
      </div>
      <input 
        :placeholder="placeholder" 
        v-model="content"
        type="text" 
        class="tag-inputer"
        v-if="!disabled && !readonly"
        @keydown="doCreateTag" />
    </div>
  </div>
</template>
<script>
import toast from './../plugins/toast'
// 标签编辑器
export default {
  data () {
    return {
      hasInitiated: false,
      isString: false, // 传入值 value 是否为字符串
      content: '',
      target: ''
    }
  },
  props: {
    value: {
      type: [Array, String],
      required: true
    },
    splitChar: { // 分割不同标签的字符
      type: String,
      default: '|'
    },
    placeholder: {
      type: String,
      default: '输入按回车添加标签'
    },
    noRepeat: {
      type: [String, Number, Boolean],
      default: false
    },
    disabled: {
      type: [Boolean, String, Number],
      default: false
    },
    readonly: {
      type: [Boolean, String, Number],
      default: false
    },
    onCreated: { // 回车创建时
      type: Function
    },
    onRemoved: { // 当删除指定标签时
      type: Function
    }
  },
  methods: {
    $_initTarget () {
      if (Array.isArray(this.value)) {
        this.target = [].concat(this.value)
        return
      }
      this.isString = true
      if (!this.value) {
        this.target = []
      } else {
        this.target = this.value.split(this.splitChar)
      }
    },
    $_syncTarget () {
      if (this.isString) {
        this.$emit('input', this.target.join(this.splitChar))
      } else {
        this.$emit('input', this.target)
      }
    },
    $_isAnySameTag () {
      return this.target.filter(v => v === this.content).length
    },
    doCreateTag () {
      if (!this.content && event.keyCode === 8) { 
        // 内容为空时按删除按钮
        this.doRemoveTag(this.target.length - 1)
        return
      }
      if (!this.content || event.keyCode !== 13) {
        return
      }
      if (!this.content.trim()) {
        this.content = ''
        return
      }
      if (this.noRepeat && this.$_isAnySameTag()) {
        toast.warn('不能输入重复的标签')
        return
      }
      this.target.push(this.content)
      this.onCreated instanceof Function && this.onCreated(this.content)
      this.$emit('change', this.content)
      this.content = ''
      this.$_syncTarget()
    },
    doRemoveTag (idx) {
      const tag = this.target[idx]
      this.target.splice(idx, 1)
      this.onRemoved instanceof Function && this.onRemoved(tag)
      this.$emit('change', tag)
      this.$_syncTarget()
    }
  },
  created () {
    this.$_initTarget()
  },
  watch: {
    value: {
      deep: true,
      handler (newVal) {
        if (newVal) {
          this.$_initTarget()
        }
      }
    }
  }
}
</script>
