<template>
  <div class="hx-block">
    <!-- HXUI对于管理后台的应用 -->
    <div :class="showSidebar ? 'hx-sidebar show' : 'hx-sidebar'">
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
            <button :class="['first-level', menu.selected && 'selected', !menu.children && 'no-children']"
                    @click="doSelect(menu)">
              <span v-text="menu.name"></span>
              <img v-if="menu.children" class="icon" src="./../../hxui/img/icon/icon-caret-right.png" alt="">
            </button>
            <div class="pad-children"
                 v-if="menu.selected && menu.children">
              <button :class="`fa fa-${child.icon} ${child.selected && 'selected'}`"
                      v-for="child in menu.children"
                      v-bind:key="child.state"
                      @click="doSelect(child)"
                      v-text="child.name"></button>
            </div>
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
    <!-- 移动版切换侧边栏按钮 -->
    <button :class="['btn-show-sidebar fa fa-list',  (showSidebar ? ' show' : '')]"
      @click="toggleSidebar()">
    </button>
    <!-- 主要内容区 -->
    <div class="hx-main">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import menus, { restoreMenu } from '../../config/menus'
import { project } from '../../config'
export default {
  name: 'admin',
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
      if (menu.state) {
        restoreMenu()
        menu.selected = true
        this.$router.push(menu.state)
      } else {
        menu.selected = !menu.selected
        console.log('UPDATE: ', menu.selected)
        this.$forceUpdate()
      }
    },
    toUserInfo () {},
    doLogout () {}
  },
  created () {
    console.log('选中的菜单：', menus)
  }
}
</script>

<style>
</style>
