<template>
  <div ref="section"
    :class="['hx-section ', foldable && 'foldable', expand && 'fold']">
    <header @click="doToggleFold">
      <span class="title" v-text="title"></span>
    </header>
    <div class="right">
      <slot name="right"></slot>
    </div>
    <slot class="content" name="content"></slot>
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
    foldable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    doToggleFold () {
      this.expand = !this.expand
    },
    $_initHeight () {
      if (this.foldable) {
        const dom = this.$refs.section
        dom.style.height = `${dom.offsetHeight}px`
      }
    }
  },
  mounted () {
    this.$_initHeight()
  }
}
</script>
