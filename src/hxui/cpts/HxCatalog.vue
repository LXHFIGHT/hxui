<template>
  <aside class="hx-catalog">
    <section :class="['section-first', menu.opened ? 'opened' : '']" v-for="(menu, index) in catalogMenus" :key="index">
      <button class="btn-main" @click="doSelectMenu(menu)">
        <span v-text="menu.key"></span>
        <button :class="['btn-toggle', !menu.children ? 'go' : '']">
          <img :src="iconPointDown" alt="">
        </button>
      </button>
      <section :class="['section-second', child.opened ? 'opened' : '']"
        v-if="menu.children && menu.children.length"
        v-for="(child, childIndex) in menu.children"
        :key="childIndex">
        <button class="btn-main" @click="doSelectMenu(child)">
          <span v-text="child.key"></span>
          <button :class="['btn-toggle', !child.children ? 'go' : '']">
            <img :src="iconPointDown" alt="">
          </button>
        </button>
        <section class="section-third"
          v-if="child.children && child.children.length"
          v-for="(item, itemIndex) in child.children"
          :key="itemIndex">
          <button class="btn-main" @click="doSelectMenu(item)">
            <span v-text="item.key"></span>
            <button class="btn-toggle go">
              <img :src="iconPointDown" alt="">
            </button>
          </button>
        </section>
      </section>
    </section>
  </aside>
</template>

<script>
import iconPointDown from './../../hxui/img/icon/icon-point-down.png'
export default {
  name: 'hx-catalog',
  data () {
    return {
      iconPointDown,
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
    initCatalogMenu () {
      this.catalogMenus = [].concat(this.menus)
      console.log(this.catalogMenus)
      for (let i = 0; i < this.catalogMenus.length; i++) {
        console.log(this.catalogMenus[i])
        if (this.catalogMenus[i].children) {
          this.catalogMenus[i].opened = true
          break
        }
      }
      console.log(this.catalogMenus)
    },
    doSelectMenu (item) {
      if (item.children) {
        item.selected = !item.selected
      } else {
        console.log('DATA:', item)
        const target = item.value || item.key
        this.onSelect(target)
      }
    }
  },
  created () {
    this.initCatalogMenu()
  }
}
</script>
