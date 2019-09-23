<template>
  <div class="hx-tag-editor">
    <div class="zone-tags">
      <div v-for="(item, idx) in value" class="tag" :key="idx">
        {{ item }}
        <button class="btn-remove" @click="doRemoveTag(idx)">×</button>
      </div>
      <input 
        :placeholder="placeholder" 
        v-model="content"
        type="text" 
        class="tag-inputer"
        v-if="!disabled"
        @keydown="doCreateTag" />
    </div>
  </div>
</template>
<script>
import HxInput from './HxInput'
// 标签编辑器
export default {
  components: {
    HxInput
  },
  data () {
    return {
      content: ''
    }
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    color: {
      type: String,
      default: 'pink'
    },
    placeholder: {
      type: String,
      default: '输入按回车添加标签'
    },
    disabled: {
      type: [Boolean, String, Number],
      default: false
    },
    onConfirm: { // 回车创建时
      type: Function
    },
    onRemove: { // 当删除指定标签时
      type: Function
    }
  },
  methods: {
    doEnter () {
      const value = event.target.value
      this.$emit('input', value)
    },
    doCreateTag () {
      if (!this.content && event.keyCode === 8) { 
        // 内容为空时按删除按钮
        this.doRemoveTag(this.value.length - 1)
        return
      }
      if (!this.content || event.keyCode !== 13) {
        return
      }
      let result = [].concat(this.value)
      result.push(this.content)
      this.onConfirm instanceof Function && this.onConfirm(this.content)
      this.$emit('input', result)
      this.content = ''
    },
    doRemoveTag (idx) {
      let result = [].concat(this.value)
      result.splice(idx, 1)
      this.onRemove instanceof Function && this.onRemove(this.value[idx])
      this.$emit('input', result)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "./../scss/variable.scss";
  .hx-tag-editor {
    .zone-tags {
      .tag {
        cursor: default;
        height: 30px;
        line-height: 30px;
        padding: 0 $pm-sm;
        background-color: white;
        text-align: center;
        color: $color-heavy;
        border-radius: $pm-sm/2;
        display: inline-block;
        border: 1px solid $color-gray;
        margin: $pm-sm/4 $pm-sm $pm-sm/4 0;
        .btn-remove {
          position: relative;
          margin-right: -$pm-sm;
          display: none;
          &:hover {
            color: $color-red;
          }
        }
        &:hover {
          .btn-remove {
            display: inline-block;
          }
        }
      }
    }
    .tag-inputer {
      height: 30px;
      width: 140px;
      margin-top: $pm-sm/4;
      display: inline-block;
      border: none!important;
      background-color: transparent;
      padding: 0;
    }
  }
  
</style>
