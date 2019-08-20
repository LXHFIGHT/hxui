<template>
  <div class="hx-block">
    <hx-navbar
      :isAdmin="true"
      :logo="project.logo"
      :title="project.name">
      <div class="right" slot="right">
        <slot name="right"></slot>
      </div>
    </hx-navbar>
    <div class="hx-main">
      <!-- HXUI对于管理后台的应用 -->
      <div :class="['hx-sidebar',
        (project.theme === Themes.LIGHT && 'light'),
        foldSidebar && 'folded',
        showSidebar && 'show']">
        <div class="sidebar ">
          <div class="sidebar-buttons">
            <div class="group-btn-sidebar"
                v-for="menu in menus"
                v-bind:key="menu.state">
              <button :class="['first-level', 
                menu.selected && 'selected',
                menu.icon && `fa fa-${menu.icon}`,
                !menu.children && 'no-children']"
                @click="doSelect(menu)">
                <span v-text="menu.name"></span>
                <img v-if="menu.children" 
                  class="icon" 
                  :src="iconCaretRight" alt="">
              </button>
              <div class="pad-children"
                  v-if="menu.selected && menu.children">
                <button :class="`second-level fa fa-${child.icon} ${child.selected && 'selected'}`"
                  v-for="child in menu.children"
                  v-bind:key="child.state"
                  @click="doSelect(child)"
                  v-text="child.name">
                </button>
              </div>
            </div>
          </div>
          <div class="version" v-text="project.version"></div>
          <div class="footer-btn-sidebar">
            <button class="hx-button" @click="toUserInfo()" style="margin-right: 8px;">修改密码</button>
            <button class="hx-button" @click="doLogout()">退出登录</button>
          </div>
        </div>
      </div>
      <!-- 主要内容区 -->
      <div class="hx-main" @click="doHideSidebar">
          <router-view></router-view>
      </div>
    </div>
    <!-- 移动版切换侧边栏按钮 -->
    <button :class="['btn-show-sidebar fa fa-list',  (showSidebar ? ' show' : '')]"
      @click="doSwitchSidebar()">
    </button>
    <!-- PC版切换侧边栏宽窄模式的按钮 -->
    <button :class="['btn-toggle-sidebar fa fa-list', foldSidebar && 'folded']"
      @click="doToggleSidebar()">
    </button>  
  </div>
</template>

<script>
import menus, { restoreMenu } from '../../config/menus'
import { project } from '../../config'
import { Themes } from './../../config/const'
import HxNavbar from './../../hxui/cpts/HxNavbar'
import iconRight from './../../hxui/img/icon/icon-caret-right.png'
import iconRightForLight from './../../hxui/img/icon/icon-caret-right-gray.png'
export default {
  name: 'admin',
  components: {
    HxNavbar
  },
  data () {
    return {
      menus,
      project,
      logo: project.logo,
      showSidebar: false,
      foldSidebar: false,
      Themes,
      iconCaretRight: ''
    }
  },
  methods: {
    doToggleSidebar () {
      this.foldSidebar = !this.foldSidebar
    },
    doSwitchSidebar () {
      this.showSidebar = !this.showSidebar
    },
    doHideSidebar () {
      this.showSidebar = false
    },
    doSelect (menu) {
      if (menu.state) {
        restoreMenu()
        menu.selected = true
        this.$router.push(menu.state)
      } else {
        !menu.selected && restoreMenu()
        menu.selected = !menu.selected
        this.$forceUpdate()
      }
    },
    toUserInfo () {},
    doLogout () {}
  },
  created () {
    this.iconCaretRight = (project.theme === Themes.LIGHT 
      ? iconRightForLight
      : iconRight)
  }
}
</script>
