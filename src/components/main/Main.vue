<template>
  <div class="hx-block">
    <div :class="showSidebar ? 'hxui-sidebar show' : 'hx-sidebar'">
      <div class="sidebar">
        <div class="project-info">
          <img class="logo"
               :src="project.logo">
          <span class="text-name"
                v-text="project.name"></span>
        </div>
        <div class="sidebar-buttons">
          <div class="group-btn-sidebar"
               v-for="menu in menus"
               v-bind:key="menu.state">
            <button :class="`first-level ${menu.selected ? 'selected' : ''} ${ !menu.children ? 'no-children' : ''}`"
                    @click="doSelect(menu)"
                    v-text="menu.name"></button>
            <div class="pad-children"
                 v-if="menu.selected && menu.children">
              <button :class="`fa fa-${child.icon} ${child.selected && 'selected'}`"
                      v-for="child in menu.children"
                      v-bind:key="child.state"
                      @click="doSelect(child)"
                      v-text="child.name"></button>
            </div>
          </div>

          <div class="footer-btn-sidebar">
            <button class="fa fa-user"
                    @click="toUserInfo()"></button>
            <button class="fa fa-sign-out" @click="doLogout()"></button>
          </div>

          <div class="version" v-text="project.version"></div>
        </div>
      </div>
    </div>
    <!-- 移动版切换侧边栏按钮 -->
    <button :class="'btn-show-sidebar fa fa-list' + (showSidebar ? 'show' : '')"
            @click="toggleSidebar()">
    </button>
    <!-- 主要内容区 -->
    <div class="hx-main">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import menus from '../../router/menus'
import project from '../../config/project'
export default {
  data () {
    return {
      menus,
      project,
      showSidebar: false,
      selectedMenu: null
    }
  },
  methods: {
    toggleSidebar () {
      this.showSidebar = !this.showSidebar
    },
    doSelect (menu) {
      if (menu.children) {
        menu.selected = !menu.selected
        return
      }
      if (!menu.selected) {
        if (this.selectedMenu && !this.selectedMenu.children) {
          this.selectedMenu.selected = false
        }
        menu.selected = !menu.selected
        this.selectedMenu = menu
        menu.state && this.$router.push(menu.state)
      }
    },
    toUserInfo () {},
    doLogout () {}
  }
}
</script>

<style>
</style>
