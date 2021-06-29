<template>
  <nav :class="['hx-nav', isAdmin && 'admin']">
    <div class="container">
      <div class="nav-left">
        <img v-if="logo" class="logo" :src="logo" alt="" @click="toHome">
        <span v-if="title" class="title" v-text="title"></span>
        <slot name="follow"></slot>
      </div>
      <div :class="['nav-buttons', (showNavbuttons && 'show')]">
        <div class="mask hide-md hide-bg" @click="doToggle"></div>
        <div :class="['hx-dropdown bg', index === currentIndex && 'selected']" 
          v-for="(option, index) in options" :key="index">
          <button class="button" v-text="option.name" @click="doSelectOption(option, index === currentIndex)"></button>
          <div class="pad-options">
            <ul class="list" v-if="option.children">
              <li :class="['item', cIndex === childrenIndex && 'selected']" 
                v-for="(child, cIndex) in option.children" 
                :key="cIndex"
                @click="doSelectOption(child, cIndex === childrenIndex)"
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
      options: [],
      currentIndex: -1,
      childrenIndex: -1
    }
  },
  props: {
    menus: {
      type: Array,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    title: String,
    logo: String,
    home: { // 首页对应链接
      type: String,
      default: '/'
    },
    onSelect: {
      type: Function
    }
  },
  created () {
    this.options = [].concat(this.menus) // 将菜单注入到组件内的options字段中
  },
  mounted () {
    this.$_getIndex(this.$route)
  },
  methods: {
    $_getIndex ($route) {
      const index = this.options.findIndex(v => v.state === $route.path)
      index !== -1 && (this.currentIndex = index)
      for (let i = 0; i < this.options.length; i++) {
        const item = this.options[i]
        if (!item.children || (item.children && !item.children.length)) {
          continue
        }
        const cIndex = item.children.findIndex(v => v.state === $route.path)
        if (cIndex === -1) {
          continue
        }
        this.currentIndex = i
        this.childrenIndex = cIndex
        return
      }
    },
    doSelectOption (option, isSelected) {
      if (isSelected) {
        return
      }
      this.showNavbuttons = false
      this.$forceUpdate()
      this.onSelect instanceof Function && this.onSelect(option.state)
    },
    doToggle () {
      this.showNavbuttons = !this.showNavbuttons
    },
    toHome () {
      (this.home.indexOf('http') === 0 || this.home.indexOf('//') === 0) 
        ? window.open(this.home, '_self')
        : this.$router.push(this.home)
    }
  },
  watch: {
    $route: {
      handler (newVal, oldVal) {
        this.$_getIndex(newVal)
      },
      deep: true
    }
  }
}
</script>
