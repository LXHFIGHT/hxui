<template>
  <div :class="['hx-advance-search', show && 'show']">
    <div class="pad-search">
      <slot></slot>
      <span @click="show = false" class="btn-hide">点此收起搜索栏</span>
    </div>
    <button class="btn-folder"
      @click="doToggleFold">
      <icon-search class="icon" :fill="show ? Colors.GREEN : Colors.GRAY_DEEP">
      </icon-search>
      <span :class="['text', show && 'color-green']" v-text="show ? '收起搜索项' : '展开搜索项'"></span>
    </button>
  </div>
</template> 

<script>
// HXUI Admin： 管理后台使用的搜索区组件
import IconSearch from './../../img/svg/search.svg'
import { Colors } from './../../const'
export default {
  name: 'hx-search',
  components: {
    IconSearch
  },
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
      show: false,
      Colors
    }
  },
  methods: {
    doToggleFold () {
      this.show = !this.show
    }
  }
}
</script>
