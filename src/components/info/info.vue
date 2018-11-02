<template>
  <div class="hx-block">
    <!-- HXUI对于文档页面的应用 -->
    <hx-navbar :menus="menus"
      :logo="logo"
      :onSelect="doSelect"></hx-navbar>
    <div class="hx-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HxNavbar from './../../hxui/cpts/HxNavbar.vue'
import menus from './../../router/menus'
import logo from './../../assets/img/logo.png'
export default {
  components: {
    HxNavbar
  },
  data () {
    return {
      menus,
      logo
    }
  },
  methods: {
    doSelect () {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
