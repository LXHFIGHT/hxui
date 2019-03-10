<template>
  <div class="hx-block">
    <hx-header title="反馈组件"></hx-header>
    <div class="hx-content">
      <div class="hx-emptyset">
        暂无相关反馈组件
      </div>
    </div>
    <div class="hx-footer">
      <hx-pagination :doRequest="doRequest" :total="1"></hx-pagination>
    </div>
  </div>
</template>

<script>
import HxPagination from '@/hxui/cpts/HxPagination'
export default {
  components: {
    HxPagination
  },
  data () {
    return {}
  },
  methods: {
    doRequest () {}
  }
}
</script>
