<template>
  <aside class="hx-catalog">
    <section class="section-first" v-for="(menu, index) in menus" :key="index">
      <button class="btn-main" v-text="menu.key" @click="doSelectMenu(menu)"></button>
      <section class="section-second"
        v-if="menu.children && menu.children.length"
        v-for="(child, childIndex) in menu.children"
        :key="childIndex">
        <button class="btn-main" v-text="child.key" @click="doSelectMenu(menu)"></button>
        <section class="section-third"
          v-if="child.children && child.children.length"
          v-for="(item, itemIndex) in child.children"
          :key="itemIndex">
          <button class="btn-main" v-text="item.key" @click="doSelectMenu(menu)"></button>
        </section>
      </section>
    </section>
  </aside>
</template>

<script>
export default {
  name: 'hx-catalog',
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
  }
}
</script>
