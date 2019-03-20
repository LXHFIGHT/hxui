<template>
  <div class="hx-block">
    <!-- HXUI对于文档页面的应用 -->
    <hx-navbar :menus="menus"
      :logo="logo"
      title="HXUI"
      :onSelect="doSelect">
    </hx-navbar>
    <div class="hx-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HxNavbar from './../../hxui/cpts/HxNavbar.vue'
import menus from './../../config/menus'
import { project } from '@/config' 
export default {
  name: 'front-page',
  components: {
    HxNavbar
  },
  data () {
    return {
      menus,
      logo: project.logo
    }
  },
  methods: {
    doSelect (state) {
      this.$router.push(state)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
