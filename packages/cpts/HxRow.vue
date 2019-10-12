<template>
  <div class="hx-row" :class="[
    oneline && 'oneline',
    !label && 'null-label',  // 当没有写入label时，行内容 content 显示一行
    labelSize && `${labelSize}-label`]">
    <label v-if="label">
      {{ label }}
      <span v-if="required" class="tip">*</span>
      <span class="label-tips" v-text="tips" v-if="tips"></span>
      <slot name="label"></slot>
    </label>
    <div class="content">
      <slot ></slot>
      <span class="right">
        <slot name="right"></slot>
        <slot name="degree"></slot> 
      </span>
    </div>
    <span class="text-tips">
      <slot name="tips"></slot>
    </span>
  </div>
</template>

<script>
/**
 * HxRow 行组件一共有3个插槽：
 *  label插槽： 置于label中， 一般用于放置字数较少提示信息，如果上传图片规格
 *  right插槽： 在行内容区域右侧， 一般用于放置单位信息
 *  tips插槽： 在行内容区域下方，一般用于放置字数多的提示信息，区域更广
 */
export default {
  name: 'hx-row',
  props: {
    label: {
      type: String
    },
    labelSize: { // 行元素标签的宽度， null为不展示标签， 除此之外还有md, bg两种规格
      type: String,
      validator (val) {
        return ['md', 'bg', 'sm', 'lg'].includes(val)
      }
    },
    tips: {
      type: String // 展示在label中的提示文本
    },  
    oneline: {
      type: [String, Boolean, Number],
      default: false
    },
    required: {
      type: [String, Boolean, Number],
      default: false
    }
  },
  data () {
    return {}
  },
  created () {}
}
</script>
