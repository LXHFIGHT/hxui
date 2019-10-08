<template>
  <aside class="hx-catalog">
    <section :class="['section section-first', menu.opened ? 'opened' : '']" v-for="(menu, index) in catalogMenus" :key="index">
      <button :class="['btn-main',
        menu.disabled ? 'disabled' : '',
        menu.children ? '' : 'option',
        menu.selected ? 'selected' : '']"
        v-if="_isObject(menu)"
        @click="doSelectMenu(menu)">
        <span v-text="menu.key"></span>
        <button v-if="!menu.disabled" 
          :class="['btn-toggle', !menu.children ? 'go' : '']">
          <img :src="iconPointDown" alt="">
        </button>
      </button>
      <span class="text-title" v-if="_isString(menu) && menu !== '|'" v-text="menu"></span>
      <span class="divider" v-if="_isString(menu) && menu === '|'" v-text="menu"></span>
      <div v-if="menu.children && menu.children.length">
        <section :class="['section section-second', child.opened ? 'opened' : '']"
        v-for="(child, childIndex) in menu.children"
        :key="childIndex">
        <button :class="['btn-main',
          child.children ? '' : 'option',
          child.selected ? 'selected' : '']"
          v-if="_isObject(child)"
          @click="doSelectMenu(child)">
          <span v-text="child.key"></span>
          <button :class="['btn-toggle', !child.children ? 'go' : '']">
            <img :src="iconPointDown" alt="">
          </button>
        </button>
        <span class="text-title" v-if="_isString(child) && child !== '|'" v-text="child"></span>
        <span class="divider" v-if="_isString(child) && child === '|'"></span>
        <div v-if="child.children && child.children.length">
          <section class="section section-third"
              v-for="(item, itemIndex) in child.children" 
              :key="itemIndex">
              <button :class="['btn-main option', item.selected ? 'selected' : '']"
                v-if="_isObject(item)"
                @click="doSelectMenu(item)">
                <span v-text="item.key"></span>
                <button class="btn-toggle go">
                  <img :src="iconPointDown" alt="">
                </button>
              </button>
              <span class="text-title" v-if="_isString(item) && item !== '|'" v-text="item"></span>
              <span class="divider" v-if="_isString(item) && item === '|'"></span>
            </section>
          </div>
        </section>
      </div>
    </section>
  </aside>
</template>

<script>
import iconPointDown from './../img/icon/icon-point-down.png'
export default {
  name: 'hx-catalog',
  data () {
    return {
      iconPointDown,
      cacheSelectItem: {},
      catalogMenus: []
    }
  },
  props: {
    /**
     * 其中menus数组由以下形式的对象为：
     * {
     *    key: 目录中显示的名字
     *    value: 对应目录的操作值，默认使用key值
     *    children: 下一级目录 （此处限制最多三级目录， 目录中的格式和menu的对象一样）
     *    disabled: 是否可以点击
     * }
     */
    menus: {
      type: Array,
      required: true
    },
    onSelect: {
      type: Function,
      required: true
    }
  },
  methods: {
    _isObject (obj) {
      return typeof obj === 'object'
    },
    _isString (obj) {
      return typeof obj === 'string'
    },
    initCatalogMenu () {
      this.catalogMenus = [].concat(this.menus)
      for (let i = 0; i < this.catalogMenus.length; i++) {
        if (this.catalogMenus[i].children) {
          this.catalogMenus[i].opened = true
          break
        }
      }
    },
    doSelectMenu (item) {
      if (item.disabled) {
        return
      }
      if (item.children) {
        item.opened = !item.opened
        this.$forceUpdate()
      } else {
        this.cacheSelectItem.selected = false
        item.selected = true
        const target = item.value || item.key
        this.cacheSelectItem = item
        this.onSelect(target)
        this.$forceUpdate()
      }
    }
  },
  created () {
    this.initCatalogMenu()
  }
}
</script>
