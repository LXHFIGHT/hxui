<template>
  <div ref="section"
    :class="['hx-section', expand && 'fold']"
    @click="doToggleFold">
    <header class="foldable">
      <span class="title" v-text="title"></span>
      <slot name="right" class="right"></slot>
    </header>
    <slot class="content" name="content"></slot>
  </div>
</template>

<script>
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
    title: String
  },
  methods: {
    doToggleFold () {
      this.expand = !this.expand
    }
  },
  mounted () {
    const dom = this.$refs.section
    console.log(dom, dom.offsetHeight, dom.style)
    dom.style.height = dom.offsetHeight + 'px'
  }
}
</script>
