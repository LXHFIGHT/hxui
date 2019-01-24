<template>
  <div :class="['hx-advance-search', folded && 'folded']">
    <div class="pad-search">
      <slot></slot>
    </div>
    <button
      class="btn-folder"
      @click="doToggleFold"
      v-text="folded ? '展开' : '收起'"
      v-if="foldable">
    </button>
  </div>
</template>

<script>
// HXUI Admin： 管理后台使用的搜索区组件
export default {
  name: 'HxSearchPanel',
  props: {
    foldable: {
      type: Boolean,
      default: true
    },
    isFolded: { // 默认是否收起
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      folded: false
    }
  },
  methods: {
    doToggleFold () {
      this.folded = !this.folded
    }
  },
  created () {
    this.folded = this.isFolded
  }
}
</script>
