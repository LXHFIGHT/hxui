<template>
  <div>
    首页
    <button class="hx-button green" @click="popAlert">测试Nav</button>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    popAlert () {
      this.$hxui.popTip('Yahoo')
    }
  }
}
</script>
