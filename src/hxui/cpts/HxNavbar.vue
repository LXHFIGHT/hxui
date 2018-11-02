<template>
  <nav class="hx-nav">
    <div class="nav-logo">
      <img :src="logo" alt="" class="logo">
    </div>
    <div :class="['nav-buttons', (showNavbuttons && 'show')]">
      <div class="mask hide-md hide-bg" @click="doToggle"></div>
      <div class="hx-dropdown bg" v-for="(menu, index) in menus" v-bind:key="index">
        <button class="button" v-text="menu.name" @click="onSelect"></button>
        <ul class="list" v-if="menu.children">
          <li class="item" v-for="(child, cIndex) in menu.children" v-bind:key="cIndex" v-text="child.name"></li>
        </ul>
      </div>
    </div>
    <button :class="['btn-toggle hide-md hide-bg', (showNavbuttons && 'on')]"
       @click="doToggle"></button>
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
      type: Array,
      required: true
    },
    logo: String,
    onSelect: {
      type: Function,
      required: true
    }
  },
  methods: {
    doToggle () {
      this.showNavbuttons = !this.showNavbuttons
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
