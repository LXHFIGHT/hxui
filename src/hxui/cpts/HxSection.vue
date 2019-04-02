<template>
  <div ref="section"
    :class="['hx-section ',
      shadow && 'shadow',
      foldable && 'foldable',
      expand && 'fold']">
    <header class="header">
      <span class="title" v-text="title"></span>
      <span class="title">
        <slot name="left"></slot>
      </span>
    </header>
    <div class="right">
      <button class="hx-button btn-toggle" @click="doToggleFold" v-if="foldable">
        <img class="icon-toggle" src="./../img/icon/icon-caret-down.png" alt="">
      </button>
      <slot name="right"></slot>
    </div>
    <slot class="content" name="content"></slot>
    <span class="side-tag"
      v-text="tag">
    </span>
  </div>
</template>
<script>
/**
 * 使用用法：
 *   slot:right  可以放置header中居右的按钮组
 */
import iconCaretDown from './../img/icon/icon-caret-down.png'
export default {
  name: 'hx-section',
  data () {
    return {
      expand: false,
      iconCaretDown
    }
  },
  props: {
    title: String,
    shadow: {
      type: Boolean,
      default: false
    },
    foldable: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String
    }
  },
  methods: {
    doToggleFold () {
      this.expand = !this.expand
    }
  }
}
</script>
