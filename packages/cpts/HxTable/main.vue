<template>
  <div :class="['hx-table', isEmpty && 'no-shadow']">
    <div class="pad-loading" v-if="loading">
      <hx-loading-icon position="center" height="35px" width="35px" level="warn">
        <span v-if="loadingText" v-text="loadingText"></span>
      </hx-loading-icon>
    </div>
    <slot class="" v-if="isNotEmpty"></slot>
    <div class="hx-emptyset" v-if="isEmpty">
      {{ emptyText }}
    </div>
  </div>
</template>

<script>
import HxLoadingIcon from './../HxLoadingIcon'
export default {
  name: 'hx-table',
  components: {
    HxLoadingIcon
  },
  props: {
    loading: {
      type: [String, Boolean],
      default: false
    },
    loadingText: {
      type: String,
      default: '加载数据中'
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    isEmpty () {
      return !this.loading && !this.data.length
    },
    isNotEmpty () {
      return !this.loading && this.data.length
    }
  }
}
</script>

<style lang="scss" scoped> 
</style> 
