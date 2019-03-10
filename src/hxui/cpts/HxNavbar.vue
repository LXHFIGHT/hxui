<template>
  <nav :class="['hx-nav', isAdmin && 'admin']">
    <div :class="isAdmin ? '' : 'hx-container'">
      <div class="nav-left">
        <img class="logo" :src="logo" alt="">
        <span class="title" v-if="title" v-text="title"></span>
      </div>
      <div :class="['nav-buttons', (showNavbuttons && 'show')]">
        <div class="mask hide-md hide-bg" @click="doToggle"></div>
        <div class="hx-dropdown bg" v-for="(menu, index) in menus" v-bind:key="index">
          <button class="button" v-text="menu.name" @click="onSelect"></button>
          <div class="pad-options">
            <ul class="list" v-if="menu.children">
              <li class="item" v-for="(child, cIndex) in menu.children" v-bind:key="cIndex" v-text="child.name"></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="nav-right">
        <slot name="right"></slot>
      </div>
      <button v-if="menus" :class="['btn-toggle hide-md hide-bg', (showNavbuttons && 'on')]"
        @click="doToggle"></button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'hx-navbar',
  data () {
    return {
      showNavbuttons: false
    }
  },
  props: {
    menus: {
      type: Array
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    title: String,
    logo: String,
    onSelect: {
      type: Function
    }
  },
  methods: {
    doToggle () {
      this.showNavbuttons = !this.showNavbuttons
    }
  }
}
</script>

<style lang="scss">
  @import "./../../hxui/scss/components/hx-navbar.scss";
</style>
