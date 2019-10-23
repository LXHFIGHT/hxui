<template>
  <nav :class="['hx-nav', isAdmin && 'admin']">
    <div :class="isAdmin ? '' : 'hx-container'">
      <div class="nav-left">
        <img class="logo" :src="logo" alt="">
        <span class="title" v-if="title" v-text="title"></span>
        <span class="tag" v-if="tag" v-text="tag"></span>
      </div>
      <div :class="['nav-buttons', (showNavbuttons && 'show')]">
        <div class="mask hide-md hide-bg" @click="doToggle"></div>
        <div :class="['hx-dropdown bg', option.selected && 'selected']" 
          v-for="(option, index) in options" v-bind:key="index">
          <button class="button" v-text="option.name" @click="doSelectOption(option)"></button>
          <div class="pad-options">
            <ul class="list" v-if="option.children">
              <li :class="['item', child.selected && 'selected']" 
                v-for="(child, cIndex) in option.children" 
                v-bind:key="cIndex"
                @click="doSelectOption(child)"
                v-text="child.name">
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="nav-right">
        <slot name="right"></slot>
      </div>
      <button v-if="options" :class="['btn-toggle hide-md hide-bg', (showNavbuttons && 'on')]"
        @click="doToggle"></button>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'hx-navbar',
  data () {
    return {
      showNavbuttons: false,
      options: []
    }
  },
  props: {
    tag: {
      type: [String, Number]
    },
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
  created () {
    this.options = this.menus // 将菜单注入到组件内的options字段中
  },
  methods: {
    $_restoreOptions () {
      for (let option of this.options) {
        option.selected = false
        if (option.children) {
          for (let child of option.children) {
            child.selected = false
          }
        }
      }
    },
    doSelectOption (option) {
      if (option.selected) {
        return
      }
      this.showNavbuttons = false
      this.$_restoreOptions()
      option.selected = true
      this.$forceUpdate()
      this.onSelect instanceof Function && this.onSelect(option.state)
    },
    doToggle () {
      this.showNavbuttons = !this.showNavbuttons
    }
  }
}
</script>
