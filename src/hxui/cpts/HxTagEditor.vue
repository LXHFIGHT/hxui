<template>
  <div class="hx-tag-editor">
    <div class="zone-input">
      <hx-input 
        :placeholder="placeholder" 
        v-model="content"
        type="text" 
        :rows="1"
        :disabled="disabled"
        @keyup="doCreateTag"
        showClearBtn="1">
      </hx-input>
    </div>
    <div class="zone-tags">
      <span class="text-tips" v-if="!value.length">
        输入内容回车即可添加标签
      </span>
      <div v-for="(item, idx) in value" class="tag" :key="idx">
        {{ item }}
        <button class="btn-remove" @click="doRemoveTag(idx)">×</button>
      </div>
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
      default: '请输入标签内容并回车添加'
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
      padding: $pm-sm;
      background-color: $color-gray-light;
      .text-tips {
        color: $color-gray-deep;
        line-height: 1.4;
        font-size: $font-md;
        text-align: center;
        display: block;
      }
      .tag {
        cursor: default;
        padding: $pm-sm/2 $pm-sm;
        background-color: white;
        text-align: center;
        color: $color-heavy;
        border-radius: $pm-sm/2;
        display: inline-block;
        line-height: $height-normal/2;
        border: 1px solid $color-gray;
        margin-bottom: $pm-sm/2;
        & + .tag {
          margin-left: $pm-sm;
        }
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
  }
</style>
