<template>
  <div class="hx-header">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <span class="title" >
      <span v-text="title"></span>
      <slot name="title"></slot>
    </span>
    <small class="title color-main"
      v-if="subTitle"
      v-text="subTitle">
    </small>
    <span class="title">
      <slot name="follow"></slot>
    </span>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
    <div class="pad-search" ref="padSearch">
      <slot name="search"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hasSearchElem: false
    }
  },
  props: {
    title: {
      type: String
    },
    subTitle: {
      type: String
    }
  },
  methods: {
    $_init () {
      const $padSearch = this.$refs.padSearch
      this.hasSearchElem = !!$padSearch.childElementCount
    }
  },
  mounted () {
    this.$_init()
  }
}
</script>
